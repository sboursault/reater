export function TestTreeNavLink({
  icon,
  tooltipText,
  className,
  onClick,
  children
}: {
  icon: string,
  tooltipText?: string,
  className?: string,
  onClick: () => void,
  children?: React.ReactNode;
}) {
  return (
    <a
      onClick={onClick}
      className={`${className} has-text-current`}
      style={{ display: 'flex', alignItems: 'center' }}
      data-tooltip={tooltipText}>
      <span className="icon">
        <i className={icon}></i>
      </span>
      <span className="is-size-7"> {children}</span>
    </a>
  )
}