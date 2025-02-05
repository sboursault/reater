
export default function TestDetail({ name, onClose }: { name: string, onClose: () => void }) {

  if (!name) return (<></>)
    
  return (
    <div className="block">
    <section className="box is-flex is-justify-content-space-between" >
      {name}
      <button className="delete is-medium" onClick={onClose}></button>
    </section>
    </div>
  )


}
