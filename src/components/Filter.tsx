interface IFilterTimeline {
    isVisible?: boolean
}
export default function Filter({isVisible}: IFilterTimeline) {
  return (
    <>

      <div className="d-flex">
        <div className="mb-2 fs-8">Курс</div>
        <div className="d-flex  gap-3">
          <button className="btn btn-secondary">1</button>
          <button className="btn btn-secondary">2</button>
          <button className="btn btn-secondary">3</button>
          <button className="btn btn-secondary">4</button>
        </div>
        <label htmlFor="">Группа</label>
        <input type="text" name="" id="" />

      
      </div>
      {isVisible && <div className="w-100">
            asd</div>}
    </>
  )
}
