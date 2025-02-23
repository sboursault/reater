import { Status } from "@/types/report";

export function TestTreeNavStatusSwitch({
  status,
  filters,
  toggleFilters,
}:
  {
    status: Status,
    filters: Status[]
    toggleFilters: (status: Status) => void,
  }) {
  const inputClass = status == Status.success ? "passed" : status == Status.failed ? "failed" : "skipped";
  const label = status == Status.success ? "Passed" : status == Status.failed ? "Failed" : "Skipped";
  const htmlId = `passed` + label

  const onChange = () => {
    toggleFilters(status)
  }

  return (
    <div className="field">
      <input
        id={htmlId}
        type="checkbox"
        name="switchRoundedDefault"
        className={`switch is-small is-rounded is-outlined ${inputClass}`}
        onChange={onChange}
        checked={filters.indexOf(status) > -1} />
      <label htmlFor={htmlId}>
        {label}
      </label>
    </div>
  )
}