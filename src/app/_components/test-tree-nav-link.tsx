export function TestTreeNavLink({
  icon,
  onClick,
  children
}: {
  icon: string,
  onClick: () => void,
  children: React.ReactNode;
}) {
  return (
    <a
      onClick={onClick}
      className="field has-text-current"
      style={{ display: 'flex', alignItems: 'center' }}>
      <span className="icon">
        <i className={icon}></i>
      </span>
      <span className="is-size-7 ml-1"> {children}</span>
    </a>
  )
}