"use client"
import { ReactNode, useState } from "react"
import { Suite, Report, Test, Status } from "../../types/report"

export default function TestTree({ group, onSelect, activeTest }: { group: Report, onSelect: (test: Test | null) => void, activeTest: Test | null }) {
  return (
    <>
      <div className="checkboxes">
        <div className="field">
          <input id="passedFilter" type="checkbox" name="switchRoundedDefault" className="switch is-small is-rounded is-outlined passed" defaultChecked />
          <label htmlFor="passedFilter">Passed</label>
        </div>

        <div className="field">
          <input id="failedFilter" type="checkbox" name="switchRoundedDefault" className="switch is-small is-rounded is-outlined failed" defaultChecked />
          <label htmlFor="failedFilter">Failed</label>
        </div>

        <div className="field">
          <input id="skippedFilter" type="checkbox" name="switchRoundedDefault" className="switch is-small is-rounded is-outlined skipped" defaultChecked />
          <label htmlFor="skippedFilter">Skipped</label>
        </div>
      </div>

      <section className="menu">
        <ListSubGroup folded={false} group={group} onSelect={onSelect} activeTest={activeTest} filters={[Status.success, Status.failed, Status.skipped]}></ListSubGroup>
      </section>
    </>
  )
}

function ListSubGroup({ group, folded, onSelect, activeTest, filters }: { group: Suite | Report, folded: boolean, onSelect: (test: Test | null) => void, activeTest: Test | null, filters: Status[] }): ReactNode {
  return (
    <>
      {group.tests &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(group.tests || []).map((subGroup, index) => (
            'executions' in subGroup ?
              (
                <TestRow key={index} data={subGroup} onSelect={onSelect} activeTest={activeTest} filters={filters}></TestRow>
              )
              :
              (
                <SubTree key={index} data={subGroup} onSelect={onSelect} activeTest={activeTest} filters={filters}></SubTree>
              )
          ))}
        </ul>}
    </>
  )
}


function SubTree({ data, onSelect, activeTest, filters }: { data: Suite, onSelect: (test: Test | null) => void, activeTest: Test | null, filters: Status[] }) {

  const [folded, setFolded] = useState(true);

  const select = () => {
    setFolded(current => !current)
  }
  const show =
    filters.indexOf(Status.success) >= 0 && data.stats && data.stats.passedCount > 0
    || filters.indexOf(Status.failed) >= 0 && data.stats && data.stats.failedCount > 0
    || filters.indexOf(Status.skipped) >= 0 && data.stats && data.stats.skippedCount > 0

  return (
    <li className={show ? '' : 'is-hidden'}>
      <a onClick={select}>
        {data.tests &&
          <span className="icon">
            <i className={`${folded ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'}`}></i>
          </span>
        }
        <span className="ml-1">{data.name}</span>
      </a>
      <ListSubGroup group={data} folded={folded} onSelect={onSelect} activeTest={activeTest} filters={filters}></ListSubGroup>
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
    filters.indexOf(Status.success) >= 0 && data.stats.passedCount > 0
    || filters.indexOf(Status.failed) >= 0 && data.stats.failedCount > 0
    || filters.indexOf(Status.skipped) >= 0 && data.stats.skippedCount > 0

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
