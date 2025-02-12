"use client"
import { ReactNode, useState } from "react"
import { Suite, Report, Test, Status } from "../../types/report"

export default function TestTree({ group, onSelect, activeTestName }: { group: Report, onSelect: (name: string) => void, activeTestName: string }) {
  return (
    <section className="menu">
      <ListSubGroup folded={false} group={group} onSelect={onSelect} activeTestName={activeTestName}></ListSubGroup>
    </section>
  )
}

function ListSubGroup({ group, folded, onSelect, activeTestName }: { group: Suite | Report, folded: boolean, onSelect: (name: string) => void, activeTestName: string }): ReactNode {
  return (
    <>
      {group.tests &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(group.tests || []).map((subGroup, index) => (
            'executions' in subGroup ?
              (
                <TestRow key={index} data={subGroup} onSelect={onSelect} activeTestName={activeTestName}></TestRow>
              )
              :
              (
                <SubTree key={index} group={subGroup} onSelect={onSelect} activeTestName={activeTestName}></SubTree>
              )
          ))}
        </ul>}
    </>
  )
}


function SubTree({ group, onSelect, activeTestName }: { group: Suite, onSelect: (name: string) => void, activeTestName: string }) {

  const [folded, setFolded] = useState(true);

  const select = () => {
    setFolded(current => !current)
  }
  return (
    <li>
      <a onClick={select}>
        {group.tests &&
          <span className="icon">
            <i className={`${folded ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-down'}`}></i>
          </span>
        }
        <span className="ml-1">{group.name}</span>
      </a>
      <ListSubGroup group={group} folded={folded} onSelect={onSelect} activeTestName={activeTestName}></ListSubGroup>
    </li>
  )
}


function TestRow({ data, onSelect, activeTestName }: { data: Test, onSelect: (name: string) => void, activeTestName: string }) {
  const select = () => {
    onSelect(data.name)
  }
  const tags = data.executions.map((execution, index) => {
    const status = execution.status == Status.success ? 'has-background-success-25 has-text-success-25-invert' : execution.status == Status.failed ? 'has-background-danger-30 has-text-danger-30-invert' : 'is-dark'
    return (
      <span key={index} className={`tag ${status}`}>{execution.name}</span>
    )
  })
  return (
    <li className="">
      <a className={` ${activeTestName === data.name ? 'is-active' : ''}`}
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
