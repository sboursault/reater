import { Test } from "@/types/report"

export default function TestDetail({ test, onClose }: { test?: Test | null, onClose: () => void }) {

  if (!test) return (<></>)

  /*const tags = data.executions.map((execution, index) => {
    const status = execution.status == Status.success ? 'has-background-success-25 has-text-success-25-invert' : execution.status == Status.failed ? 'has-background-danger-30 has-text-danger-30-invert' : 'is-dark'
    return (
      <span key={index} className={`tag ${status}`}>{execution.name}</span>
    )
  })*/

  return (
    <article className="box" >
      <div className="block is-flex is-justify-content-space-between is-size-5">
        <h2><strong>{test.name}</strong></h2>
        <button className="delete is-medium" onClick={onClose}></button>
      </div>
      <div className="tabs">
        <ul>
          <li className="is-active"><a>Pictures</a></li>
          <li><a>Music</a></li>
          <li><a>Videos</a></li>
          <li><a>Documents</a></li>
        </ul>
      </div>
    </article>
  )


}
