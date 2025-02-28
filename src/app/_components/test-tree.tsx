"use client"
import { ReactNode, useState } from "react"
import { Suite, Report, Test, Status } from "../../types/report"
import { TestTreeNavLink } from "./test-tree-nav-link"
import { TestTreeNavStatusSwitch } from "./test-tree-nav-status-switch"

type TestFilter = {
  status: Status[],
  text: string,
}

export default function TestTree({
  report,
  selectTest,
  activeTest
}: {
  report: Report,
  selectTest: (test: Test | null) => void,
  activeTest: Test | null
}) {
  const [filter, setFilter] = useState<TestFilter>({
    status: [Status.success, Status.failed, Status.skipped],
    text: ''
  })
  const [expandedSuites, setExpandedSuites] = useState<string[]>([report.tests.uuid])

  const expandCollapaseSuite = (suite: Suite) => {
    if (expandedSuites.indexOf(suite.uuid) == -1)
      setExpandedSuites(expandedSuites.concat(suite.uuid))
    else
      setExpandedSuites(expandedSuites.filter(each => each !== suite.uuid))
  }
  const setFilters = (status: Status[]) => {
    setFilter({
      status, text: filter.text
    })
  }


  const setTextFilter = (text: string) => {
    setFilter({
      status: filter.status, text
    })
  }

  const toggleFilters = (status: Status) => {
    if (filter.status.indexOf(status) == -1) {
      setFilters(filter.status.concat([status]))
    } else {
      setFilters(filter.status.filter(obj => obj !== status))
    }
    expandAll()
  }

  const collapseAll = () => {
    setExpandedSuites([report.tests.uuid])
  }

  const expandAll = () => {
    const suiteUuids: string[] = []
    function gatherUuids(suite: Suite) {
      (suite.tests || []).forEach(each => {
        if ('uuid' in each) {
          suiteUuids.push(each.uuid)
          gatherUuids(each)
        }
      });
    }
    gatherUuids(report.tests)
    setExpandedSuites(suiteUuids.concat([report.tests.uuid]))
  }

  return (
    <>
      <div className="mb-2 checkboxes is-align-items-center">

        <div className="ml-1">
          <p className="control has-icons-left has-icons-right">
            <input className="input is-expanded" type="text" placeholder="Search..."
              style={{ width: '17em' }}
              value={filter.text}
              onChange={(e) => setTextFilter(e.target.value)} />
            <span className="icon is-small is-left">
              <i className="fa-solid fa-magnifying-glass"></i>
            </span>
          </p>
        </div>

        <TestTreeNavStatusSwitch
          status={Status.success}
          filters={filter.status}
          className="ml-2"
          toggleFilters={toggleFilters} />
        <TestTreeNavStatusSwitch
          status={Status.failed}
          filters={filter.status}
          toggleFilters={toggleFilters} />
        <TestTreeNavStatusSwitch
          status={Status.skipped}
          filters={filter.status}
          toggleFilters={toggleFilters} />

        <div className="is-flex">
          <TestTreeNavLink
            icon="fa-solid fa-compress"
            onClick={collapseAll}
            tooltipText="Collapse All" />
          <TestTreeNavLink
            icon="fa-solid fa-expand"
            className="ml-1"
            onClick={expandAll}
            tooltipText="Expand All" />
        </div>
      </div>

      <section className="menu">
        <ListSubGroup
          data={report.tests}
          expandedSuites={expandedSuites}
          onSelectTest={selectTest}
          expandCollapaseSuite={expandCollapaseSuite}
          activeTest={activeTest}
          filter={filter}>
        </ListSubGroup>
      </section>
    </>
  )
}


function ListSubGroup({
  data,
  expandedSuites,
  onSelectTest,
  expandCollapaseSuite,
  activeTest,
  filter
}: {
  data: Suite,
  expandedSuites: string[],
  onSelectTest: (test: Test | null) => void,
  expandCollapaseSuite: (suite: Suite) => void,
  activeTest: Test | null,
  filter: TestFilter
}): ReactNode {

  const isCollapsed = expandedSuites.indexOf(data.uuid) === -1
  return (
    <>
      {data.tests &&
        <ul className={`menu-list ${isCollapsed ? 'is-hidden' : ''}`}>
          {(data.tests || []).map((each, index) => (
            <Node
              key={index}
              data={each}
              expandedSuites={expandedSuites}
              activeTest={activeTest}
              onSelectTest={onSelectTest}
              expandCollapaseSuite={expandCollapaseSuite}
              filter={filter} />
          ))}
        </ul>}
    </>
  )
}

function Node({
  data,
  expandedSuites,
  onSelectTest,
  expandCollapaseSuite,
  activeTest,
  filter
}: {
  data: Suite | Test,
  expandedSuites: string[],
  onSelectTest: (test: Test | null) => void,
  expandCollapaseSuite: (suite: Suite) => void,
  activeTest: Test | null,
  filter: TestFilter
}) {

  const isVisibleTest = (test: Test) => {
    return (filter.status.indexOf(Status.success) >= 0 && test.stats != null && test.stats.passedCount > 0
      || filter.status.indexOf(Status.failed) >= 0 && test.stats != null && test.stats.failedCount > 0
      || filter.status.indexOf(Status.skipped) >= 0 && test.stats != null && test.stats.skippedCount > 0)
      && (filter.text.length == 0
        || test.name.toLowerCase().indexOf(filter.text.toLowerCase()) != -1)
  }

  const isVisibleSuite = (suite: Suite) => {
    const tests = suite.tests || []
    for(let i = 0; i < tests.length; i++) {
      const each = tests[i]
      if ('executions' in each) {
        if (isVisibleTest(each)) return true
      } else {
        if (isVisibleSuite(each)) return true
      }
    }
    return false
  }

  if ('executions' in data)
    return (
      <TestRow
        data={data}
        onSelectTest={onSelectTest}
        isActive={activeTest?.name === data.name}
        isVisible={isVisibleTest(data)} />
    )
  else
    return (
      <SubTree
        expandedSuites={expandedSuites}
        data={data}
        onSelectTest={onSelectTest}
        expandCollapaseSuite={expandCollapaseSuite}
        activeTest={activeTest}
        filter={filter} 
        isVisible={isVisibleSuite(data)} />
    )
}


function SubTree(
  { data,
    expandedSuites,
    onSelectTest,
    expandCollapaseSuite,
    activeTest,
    filter,
    isVisible
  }:
    {
      data: Suite,
      expandedSuites: string[],
      onSelectTest: (test: Test | null) => void,
      expandCollapaseSuite: (suite: Suite) => void,
      activeTest: Test | null,
      filter: TestFilter
      isVisible: boolean,
    }) {

  const isCollapsed = expandedSuites.indexOf(data.uuid) === -1


  return (
    <li className={isVisible ? '' : 'is-hidden'}>
      <a onClick={() => expandCollapaseSuite(data)}>
        {data.tests &&
          <span className="icon">
            <i className={`${isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'}`}></i>
          </span>
        }
        <span className="ml-1">{data.name}</span>
      </a>
      <ListSubGroup data={data}
        expandedSuites={expandedSuites}
        onSelectTest={onSelectTest}
        expandCollapaseSuite={expandCollapaseSuite}
        activeTest={activeTest}
        filter={filter}>
      </ListSubGroup>
    </li>
  )
}


function TestRow({
  data,
  onSelectTest,
  isActive,
  isVisible,
}: {
  data: Test,
  onSelectTest: (test: Test | null) => void,
  isActive: boolean,
  isVisible: boolean,
}) {

  const tags = data.executions.map((execution, index) => {
    const status = execution.status == Status.success ? 'has-text-success-soft-invert has-background-success-soft' : execution.status == Status.failed ? 'has-text-danger-soft-invert has-background-danger-soft' : 'is-dark'
    return (
      <span key={index} className={`tag ${status} light-color`}>{execution.name}</span>
    )
  })

  return (
    <li
      className={isVisible ? '' : 'is-hidden'}>
      <a
        className={` ${isActive ? 'is-active' : ''}`}
        onClick={() => onSelectTest(data)}>
        <div className="is-flex is-align-items-center" >
          <span>{data.name}</span>
          <div className="tags ml-3">
            {tags}
          </div>
        </div>
      </a>
    </li>
  )
}


