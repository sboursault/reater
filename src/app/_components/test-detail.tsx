import { Execution, Status, Test } from "@/types/report"
import { AnsiUp } from 'ansi_up'
import { SanitizeHTML } from "./sanitize-html";
import { useState } from "react";

export default function TestDetail({
  data,
  deactivateTest
}: {
  data: Test,
  deactivateTest: () => void
}) {
  const [activeExecution, setActiveExecution] = useState<Execution>(getDefaultExecution(data));

  const tabs = data.executions.map((eachExecution, index) => {
    return (
      <ExecutionTab
        key={index}
        execution={eachExecution}
        isActive={eachExecution === activeExecution}
        selectExecution={setActiveExecution}>
      </ExecutionTab>
    )
  })

  return (
    <article className="box">
      <div className="block is-flex is-justify-content-space-between is-size-5">
        <h2><strong>{data.name}</strong></h2>
        <button className="delete is-medium" onClick={deactivateTest}></button>
      </div>
      <div className="tabs">
        <ul>
          {tabs}
        </ul>
      </div>
      <ExecutionDetail data={activeExecution}></ExecutionDetail>
    </article>
  )

}

function getDefaultExecution(data: Test): Execution {
  const failedExecutions = data.executions.filter(each => each.status == Status.failed)
  if (failedExecutions.length) return failedExecutions[0]
  else return data.executions[0]
}

export function ExecutionTab({
  execution,
  isActive,
  selectExecution
}: {
  execution: Execution,
  isActive: boolean,
  selectExecution: (execution: Execution) => void
}) {
  const select = () => {
    selectExecution(execution)
  }
  const color = execution.status == Status.success ? 'has-text-success' : execution.status == Status.failed ? 'has-text-danger' : 'is-dark'
  return <li
    className={isActive ? 'is-active' : ''}>
    <a
      className={color}
      onClick={select}>
      <strong>{execution.name}</strong>
    </a>
  </li>
}


export function ExecutionDetail({
  data,
}: {
  data: Execution,
}) {
  return (
    <div className="content">
      {data.error &&
        <>
          <div className="field">
            <p><strong>Error</strong></p>
            <ConsoleLog data={data.error?.message}></ConsoleLog>
          </div>
          {data.error.message !== data.error.stack &&
            <div className="field">
              <p><strong>Log</strong></p>
              <ConsoleLog data={data.error?.stack}></ConsoleLog>
            </div>
          }
        </>
      }
    </div>
  )
}

export function ConsoleLog({
  data,
}: {
  data: string,
}) {
  const html = new AnsiUp().ansi_to_html(data)
    .replaceAll(/\n/g, '<br>')
    .replaceAll(/    /g, '&nbsp;&nbsp;&nbsp;&nbsp;')
  return (
    <div
      className="has-text-danger-bold"
      style={{
        fontFamily: "var(--bulma-code-family)",
        fontSize: "var(--bulma-pre-font-size)",
        backgroundColor: "var(--bulma-pre-background)",
        padding: "var(--bulma-pre-padding)",
      }}>
      <SanitizeHTML html={html}>
      </SanitizeHTML>
    </div>
  )
}