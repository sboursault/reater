"use client"
import { ReactNode, useState } from "react"
import { Suite, Report, Test, Status } from "../../types/report"

export default function TestTree({ group, onSelect, activeTest }: { group: Report, onSelect: (test: Test | null) => void, activeTest: Test | null }) {
  return (
    <section className="menu">
      <ListSubGroup folded={false} group={group} onSelect={onSelect} activeTest={activeTest}></ListSubGroup>
    </section>
  )
}

function ListSubGroup({ group, folded, onSelect, activeTest }: { group: Suite | Report, folded: boolean, onSelect: (test: Test | null) => void, activeTest: Test | null }): ReactNode {
  return (
    <>
      {group.tests &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(group.tests || []).map((subGroup, index) => (
            'executions' in subGroup ?
              (
                <TestRow key={index} data={subGroup} onSelect={onSelect} activeTest={activeTest}></TestRow>
              )
              :
              (
                <SubTree key={index} group={subGroup} onSelect={onSelect} activeTest={activeTest}></SubTree>
              )
          ))}
        </ul>}
    </>
  )
}


function SubTree({ group, onSelect, activeTest }: { group: Suite, onSelect: (test: Test | null) => void, activeTest: Test | null }) {

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
      <ListSubGroup group={group} folded={folded} onSelect={onSelect} activeTest={activeTest}></ListSubGroup>
    </li>
  )
}


function TestRow({ data, onSelect, activeTest }: { data: Test, onSelect: (test: Test | null) => void, activeTest: Test | null}) {
  const select = () => {
    onSelect(data)
  }
  const tags = data.executions.map((execution, index) => {
    const status = execution.status == Status.success ? 'has-text-success-soft-invert has-background-success-soft' : execution.status == Status.failed ? 'has-text-danger-soft-invert has-background-danger-soft' : 'is-dark'
    return (
      <span key={index} className={`tag ${status} light-color`}>{execution.name}</span>
    )
  })
  return (
    <li className="">
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
