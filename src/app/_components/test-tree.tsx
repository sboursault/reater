"use client"
import { ReactNode, useState } from "react"
import TestGroup from "../../types/test-group"

export default function TestTree({ group, onSelect }: { group: TestGroup, onSelect: (name: string) => void }) {
  return (
    <section className="menu">
      {group.subGroups &&
        (group.subGroups || []).map((subGroup) => (
          <TopTree key={subGroup.name} group={subGroup} onSelect={onSelect}></TopTree>
        ))}
    </section>
  )
}

function TopTree({ group, onSelect }: { group: TestGroup, onSelect: (name: string) => void }): ReactNode {
  return (
    <>
      <p className="menu-label">{group.name}</p>
      <ListSubGroup group={group} folded={false} onSelect={onSelect}></ListSubGroup>
    </>
  )
}

function ListSubGroup({ group, folded, onSelect }: { group: TestGroup, folded: boolean, onSelect: (name: string) => void }): ReactNode {
  return (
    <>
      {group.subGroups &&
        <ul className={`menu-list ${folded ? 'is-hidden' : ''}`}>
          {(group.subGroups || []).map((subGroup) => (
            <SubTree key={subGroup.name} group={subGroup} onSelect={onSelect}></SubTree>
          ))}
        </ul>}
    </>
  )
}


export function SubTree({ group, onSelect }: { group: TestGroup, onSelect: (name: string) => void }) {

  const [folded, setFolded] = useState(true);

  const select = () => {
    setFolded(current => !current)
    onSelect(group.name)
  }
  return (
    <li>
      <a onClick={select}>
        <span className="icon">
          <i className={`fa-solid ${group.subGroups ? folded ? 'fa-chevron-right' : 'fa-chevron-down' : 'fa-fw'}`}></i>
        </span>
        {group.name}
      </a>
      <ListSubGroup group={group} folded={folded} onSelect={onSelect}></ListSubGroup>
    </li>
  )
}
