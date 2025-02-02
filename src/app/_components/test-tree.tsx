"use client"
import { ReactNode, useState } from "react"
import { TestGroup, Report, TestDetail } from "../../types/test-group"

export default function TestTree({ group, onSelect, activeTestName }: { group: Report, onSelect: (name: string) => void, activeTestName: string }) {
  return (
    <section className="menu">
      <ListSubGroup folded={false} group={group} onSelect={onSelect} activeTestName={activeTestName}></ListSubGroup>
    </section>
  )
}

function ListSubGroup({ group, folded, onSelect, activeTestName }: { group: TestGroup | Report, folded: boolean, onSelect: (name: string) => void, activeTestName: string }): ReactNode {
  return (
    <>
      {group.tests &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(group.tests || []).map((subGroup) => (
            'steps' in subGroup ?
              (
                <Test key={subGroup.name} data={subGroup} onSelect={onSelect} activeTestName={activeTestName}></Test>
              )
              :
              (
                <SubTree key={subGroup.name} group={subGroup} onSelect={onSelect} activeTestName={activeTestName}></SubTree>
              )
          ))}
        </ul>}
    </>
  )
}


function SubTree({ group, onSelect, activeTestName }: { group: TestGroup, onSelect: (name: string) => void, activeTestName: string }) {

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
        <span className="">{group.name}</span>
      </a>
      <ListSubGroup group={group} folded={folded} onSelect={onSelect} activeTestName={activeTestName}></ListSubGroup>
    </li>
  )
}


function Test({ data, onSelect, activeTestName }: { data: TestDetail, onSelect: (name: string) => void, activeTestName: string }) {

  const select = () => {
    onSelect(data.name)
  }
  return (
    <li>
      <a className={activeTestName === data.name ? 'is-active' : ''}
        onClick={select}>
        <span>{data.name}</span>
      </a>
    </li>
  )
}
