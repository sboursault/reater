
export default function TestDetail({ name }: { name: string }) {

  if (!name) return (<></>)
    
  return (
    <section className="box">
      {name}
    </section>
  )


}
