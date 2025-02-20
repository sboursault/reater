"use client"
import { ReactNode, useState } from "react"
import { Suite, Report, Test, Status } from "../../types/report"

export default function TestTree({ report, onSelect, activeTest }: { report: Report, onSelect: (test: Test | null) => void, activeTest: Test | null }) {
  const [filters, setFilters] = useState<Status[]>([Status.success, Status.failed, Status.skipped])
  const [expandedSuites, setExpandedSuites] = useState<string[]>([report.tests.uuid])

  const expandCollapaseSuite = (suite: Suite) => {
    if (expandedSuites.indexOf(suite.uuid) == -1)
      setExpandedSuites(expandedSuites.concat(suite.uuid))
    else
      setExpandedSuites(expandedSuites.filter(each => each !== suite.uuid))
  }

  const toggleFilters = (status: Status) => {
    if (filters.indexOf(status) == -1) {
      setFilters(filters.concat([status]))
    } else {
      setFilters(filters.filter(obj => obj !== status))
    }
  }

  const togglePassedFilter = () => {
    toggleFilters(Status.success)
  }

  const toggleFailedFilter = () => {
    toggleFilters(Status.failed)
  }

  const toggleSkippedFilter = () => {
    toggleFilters(Status.skipped)
  }
  return (
    <>
      <div className="checkboxes">

        <a className="field has-text-current" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="icon">
            <i className="fa-solid fa-compress"></i>
          </span> <span className="is-size-7 ml-1"> Collapse all</span>
        </a>
        <a className="field has-text-current" style={{ display: 'flex', alignItems: 'center' }}>
          <span className="icon">
            <i className="fa-solid fa-expand"></i>
          </span><span className="is-size-7 ml-1"> Expand all</span>
        </a>

        <div className="ml-1 field">
          <input id="passedFilter" type="checkbox" name="switchRoundedDefault" className="switch is-small is-rounded is-outlined passed" onChange={togglePassedFilter} checked={filters.indexOf(Status.success) > -1} />
          <label htmlFor="passedFilter">Passed</label>
        </div>

        <div className="field">
          <input id="failedFilter"
            type="checkbox" name="switchRoundedDefault" className="switch is-small is-rounded is-outlined failed" onChange={toggleFailedFilter} checked={filters.indexOf(Status.failed) > -1} />
          <label htmlFor="failedFilter">Failed</label>
        </div>

        <div className="field">
          <input id="skippedFilter" type="checkbox" name="switchRoundedDefault" className="switch is-small is-rounded is-outlined skipped" onChange={toggleSkippedFilter} checked={filters.indexOf(Status.skipped) > -1} />
          <label htmlFor="skippedFilter">Skipped</label>
        </div>

      </div>

      <section className="menu">
        <ListSubGroup
          data={report.tests}
          expandedSuites={expandedSuites}
          onSelect={onSelect}
          expandCollapaseSuite={expandCollapaseSuite}
          activeTest={activeTest}
          filters={filters}>
        </ListSubGroup>
      </section>
    </>
  )
}

function ListSubGroup(
  { data, expandedSuites, onSelect, expandCollapaseSuite, activeTest, filters }: {
    data: Suite,
    expandedSuites: string[],
    onSelect: (test: Test | null) => void,
    expandCollapaseSuite: (suite: Suite) => void,
    activeTest: Test | null,
    filters: Status[]
  }): ReactNode {

  const folded = expandedSuites.indexOf(data.uuid) === -1
  return (
    <>
      {data.tests &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(data.tests || []).map((subGroup, index) => (
            'executions' in subGroup ?
              (
                <TestRow key={index} data={subGroup} onSelect={onSelect} activeTest={activeTest} filters={filters}></TestRow>
              )
              :
              (
                <SubTree key={index} expandedSuites={expandedSuites} data={subGroup} onSelect={onSelect} expandCollapaseSuite={expandCollapaseSuite} activeTest={activeTest} filters={filters}></SubTree>
              )
          ))}
        </ul>}
    </>
  )
}


function SubTree({ data, expandedSuites, onSelect, expandCollapaseSuite, activeTest, filters }:
  {
    data: Suite,
    expandedSuites: string[],
    onSelect: (test: Test | null) => void,
    expandCollapaseSuite: (suite: Suite) => void,
    activeTest: Test | null,
    filters: Status[]
  }) {

  const folded = expandedSuites.indexOf(data.uuid) === -1

  const onClick = () => {
    expandCollapaseSuite(data)
  }
  const show =
    filters.indexOf(Status.success) >= 0 && data.stats && data.stats.passedCount > 0
    || filters.indexOf(Status.failed) >= 0 && data.stats && data.stats.failedCount > 0
    || filters.indexOf(Status.skipped) >= 0 && data.stats && data.stats.skippedCount > 0

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
        onSelect={onSelect}
        expandCollapaseSuite={expandCollapaseSuite}
        activeTest={activeTest}
        filters={filters}>
      </ListSubGroup>
    </li>
  )
}


function TestRow({ data, onSelect, activeTest, filters }: { data: Test, onSelect: (test: Test | null) => void, activeTest: Test | null, filters: Status[] }) {
  const select = () => {
    onSelect(data)
  }
  const tags = data.executions.map((execution, index) => {
    const status = execution.status == Status.success ? 'has-text-success-soft-invert has-background-success-soft' : execution.status == Status.failed ? 'has-text-danger-soft-invert has-background-danger-soft' : 'is-dark'
    return (
      <span key={index} className={`tag ${status} light-color`}>{execution.name}</span>
    )
  })

  const show =
    filters.indexOf(Status.success) >= 0 && data.stats && data.stats.passedCount > 0
    || filters.indexOf(Status.failed) >= 0 && data.stats && data.stats.failedCount > 0
    || filters.indexOf(Status.skipped) >= 0 && data.stats && data.stats.skippedCount > 0

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
