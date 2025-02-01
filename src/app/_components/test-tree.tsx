"use client"
import { ReactNode, useState } from "react"
import TestGroup from "../../types/test-group"

export default function TestTree({ group }: { group: TestGroup }) {
  return (
    <section className="menu">
      {group.subGroups &&
        (group.subGroups || []).map((subGroup) => (
          <TopTree key={subGroup.name} group={subGroup}></TopTree>
        ))}
    </section>
  )
}

function TopTree({ group }: { group: TestGroup }): ReactNode {
  return (
    <>
      <p className="menu-label">{group.name}</p>
      <ListSubGroup group={group} folded={false}></ListSubGroup>
    </>
  )
}

function ListSubGroup({ group, folded }: { group: TestGroup, folded: boolean }): ReactNode {
  return (
    <>
      {group.subGroups &&
        <ul className={"menu-list " + folded ? 'is-hidden' : ''}>
          {(group.subGroups || []).map((subGroup) => (
            <SubTree key={subGroup.name} group={subGroup}></SubTree>
          ))}
        </ul>}
    </>
  )
}


export function SubTree({ group }: { group: TestGroup }) {

  const [folded, setFolded] = useState(true);

  const toggle = () => {
    setFolded(false);
  }

  return (
    <li>
      <a>
        <span className="icon" onClick={() => toggle()}>
          <i className="fas fa-arrow-right"></i>
        </span>
        {group.name}
      </a>
      <ListSubGroup group={group} folded={folded}></ListSubGroup>
    </li>
  )
}
