import { useParams, useSearchParams } from 'react-router-dom'
import Filter from './Filter'

interface ControllerProps {
  name: string
}

export default function GenControll() {
  const nameController = useParams()

  const data = ['Спец 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5']
  const dataUser = [
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
  ]
  console.log(nameController)
  return (
    <>
      <Filter />
      <h2 className="d-flex justify-content-center">{nameController.name}</h2>
      <table className="table table-hover mt-2 bg-white rounded shadow-sm ">
        <thead>
          <tr>
            <th scope="col">№</th>
            <th scope="col">ФИО Студента</th>
            {data.map((elem, ind) => {
              return <th key={ind}>{elem}</th>
            })}
          </tr>
        </thead>
        <tbody>
          {dataUser.map((elem, indx) => {
            return (
              <tr key={indx}>
                <th scope="row">{indx + 1}</th>
                <td>{elem}</td>
                <td>5</td>
                <td>4</td>
                <td>3</td>
                <td>2</td>
                <td>1</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}
