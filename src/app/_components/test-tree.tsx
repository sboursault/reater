
import { ReactNode } from "react"
import TestGroup  from "../../types/test-group"

export default function TestTree({ group }: {group: TestGroup}) {
    return (
        <>
            { group.name? 
                (
                    <li>{group.name}
                        <ListSubGroup group={group}></ListSubGroup>
                    </li>
                ) : (
                    <ListSubGroup group={group}></ListSubGroup>
                )
            }
        </>
    )
}

function ListSubGroup({ group }: {group: TestGroup}):ReactNode {
    return     (
        <>
        {group.subGroups &&  
        <ul>
          {(group.subGroups || []).map((subGroup) => (
          <TestTree key={subGroup.name} group={subGroup}></TestTree>
      ))}
        </ul>}
        </>
      )
}