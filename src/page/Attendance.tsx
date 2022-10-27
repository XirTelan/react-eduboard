export default function Attendance() {
  const days = [...Array(31).keys()].map((e) => e + 1)
  return (
    <>
      
      <div className="d-flex gap-3">
        <button className="btn btn-secondary">Январь</button>
        <button className="btn btn-primary">Февраль</button>
        <button className="btn btn-primary">Март</button>
        <button className="btn btn-primary">Апрель</button>
        <button className="btn btn-primary">Май</button>
        <button className="btn btn-primary">Сентябрь</button>
        <button className="btn btn-primary">Октябрь</button>
        <button className="btn btn-primary">Ноябрь</button>
        <button className="btn btn-primary">Декабрь</button>
      </div>

      <table className="table table-hover mt-2 bg-white rounded shadow-sm ">
        <thead>
          <tr>
            <th rowSpan={2} scope="col">
              №
            </th>
            <th rowSpan={2} scope="col">
              ФИО Студента
            </th>
            <th colSpan={days.length - 1} scope="col" className="text-center">
              Дни месяца
            </th>
          </tr>
          <tr>
            {days.map((e) => {
              return (
                <th key={e} scope="col">
                  {e}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
            <td>1</td>
          </tr>
        </tbody>
      </table>
    </>
  )
}
