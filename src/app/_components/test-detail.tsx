import { Status, Test } from "@/types/report"

export default function TestDetail({ data, onClose }: { data: Test, onClose: () => void }) {

  const tabs = data.executions.map((execution, index) => {
    const color = execution.status == Status.success ? 'has-text-success' : execution.status == Status.failed ? 'has-text-danger-60' : 'is-dark'
    
    return (
      <li key={index} className={index == 0 ? 'is-active' : ''}><a className={color}><strong>{execution.name}</strong></a></li>
    )
  })

  return (
    <article className="box">
      <div className="block is-flex is-justify-content-space-between is-size-5">
        <h2><strong>{data.name}</strong></h2>
        <button className="delete is-medium" onClick={onClose}></button>
      </div>
      <div className="tabs">
        <ul>
          {tabs}
        </ul>
      </div>
      <div className="block">
        success : {data.stats.passedCount}<br/>
        failed : {data.stats.failedCount}<br/>
        skipped : {data.stats.skippedCount}<br/>
      </div>
    </article>
  )


}
