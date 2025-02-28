"use client"
import { ReactNode, useState } from "react"
import { Suite, Report, Test, Status } from "../../types/report"
import { TestTreeNavLink } from "./test-tree-nav-link"
import { TestTreeNavStatusSwitch } from "./test-tree-nav-status-switch"

type TestFilter = {
  status: Status[],
  text: string,
}

export default function TestTree({ report, selectTest, activeTest }: { report: Report, selectTest: (test: Test | null) => void, activeTest: Test | null }) {
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
          toggleFilters={toggleFilters}>
        </TestTreeNavStatusSwitch>
        <TestTreeNavStatusSwitch
          status={Status.failed}
          filters={filter.status}
          toggleFilters={toggleFilters}>
        </TestTreeNavStatusSwitch>
        <TestTreeNavStatusSwitch
          status={Status.skipped}
          filters={filter.status}
          toggleFilters={toggleFilters}>
        </TestTreeNavStatusSwitch>

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
          selectTest={selectTest}
          expandCollapaseSuite={expandCollapaseSuite}
          activeTest={activeTest}
          filter={filter}>
        </ListSubGroup>
      </section>
    </>
  )
}


function ListSubGroup(
  { data,
    expandedSuites,
    selectTest,
    expandCollapaseSuite,
    activeTest,
    filter
  }: {
    data: Suite,
    expandedSuites: string[],
    selectTest: (test: Test | null) => void,
    expandCollapaseSuite: (suite: Suite) => void,
    activeTest: Test | null,
    filter: TestFilter
  }): ReactNode {

  const folded = expandedSuites.indexOf(data.uuid) === -1
  return (
    <>
      {data.tests &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(data.tests || []).map((subGroup, index) => (
            'executions' in subGroup ?
              (
                <TestRow
                  key={index}
                  data={subGroup}
                  selectTest={selectTest}
                  activeTest={activeTest}
                  filter={filter} />
              )
              :
              (
                <SubTree
                  key={index}
                  expandedSuites={expandedSuites}
                  data={subGroup}
                  selectTest={selectTest}
                  expandCollapaseSuite={expandCollapaseSuite}
                  activeTest={activeTest}
                  filter={filter} />
              )
          ))}
        </ul>}
    </>
  )
}


function SubTree(
  { data,
    expandedSuites,
    selectTest,
    expandCollapaseSuite,
    activeTest,
    filter
  }:
    {
      data: Suite,
      expandedSuites: string[],
      selectTest: (test: Test | null) => void,
      expandCollapaseSuite: (suite: Suite) => void,
      activeTest: Test | null,
      filter: TestFilter
    }) {

  const folded = expandedSuites.indexOf(data.uuid) === -1

  const onClick = () => {
    expandCollapaseSuite(data)
  }
  const show =
    filter.status.indexOf(Status.success) >= 0 && data.stats && data.stats.passedCount > 0
    || filter.status.indexOf(Status.failed) >= 0 && data.stats && data.stats.failedCount > 0
    || filter.status.indexOf(Status.skipped) >= 0 && data.stats && data.stats.skippedCount > 0

  return (
    <li className={show ? '' : 'is-hidden'}>
      <a onClick={onClick}>
        {data.tests &&
          <span className="icon">
            <i className={`${folded ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'}`}></i>
          </span>
        }
        <span className="ml-1">{data.name}</span>
      </a>
      <ListSubGroup data={data}
        expandedSuites={expandedSuites}
        selectTest={selectTest}
        expandCollapaseSuite={expandCollapaseSuite}
        activeTest={activeTest}
        filter={filter}>
      </ListSubGroup>
    </li>
  )
}


function TestRow({
  data,
  selectTest,
  activeTest,
  filter
}: {
  data: Test,
  selectTest: (test: Test | null) => void,
  activeTest: Test | null,
  filter: TestFilter
}) {

  const select = () => {
    selectTest(data)
  }
  const tags = data.executions.map((execution, index) => {
    const status = execution.status == Status.success ? 'has-text-success-soft-invert has-background-success-soft' : execution.status == Status.failed ? 'has-text-danger-soft-invert has-background-danger-soft' : 'is-dark'
    return (
      <span key={index} className={`tag ${status} light-color`}>{execution.name}</span>
    )
  })

  const show =
    (filter.status.indexOf(Status.success) >= 0 && data.stats && data.stats.passedCount > 0
      || filter.status.indexOf(Status.failed) >= 0 && data.stats && data.stats.failedCount > 0
      || filter.status.indexOf(Status.skipped) >= 0 && data.stats && data.stats.skippedCount > 0)
    && (filter.text.length == 0 || data.name.toLowerCase().indexOf(filter.text.toLowerCase()) != -1)

  return (
    <li className={show ? '' : 'is-hidden'}>
      <a className={` ${activeTest?.name === data.name ? 'is-active' : ''}`}
        onClick={select}>
        <div className="is-flex is-align-items-center" ><span>{data.name}</span>
          <div className="tags ml-3">
            {tags}
          </div>
        </div>
      </a>
    </li>
  )
}
