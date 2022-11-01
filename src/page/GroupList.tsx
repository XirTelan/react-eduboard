import AutocompleteField from '../components/UI/AutocompleteField';
import TextField from '../components/UI/TextField';

export default function GroupList() {
  const students: StudentDTO[]=[
    {id: 1, name: "Max"},{id:2,name: "Alex"}
  ]
  const goups: GroupDTO[] = [
    {id: 1, name:'asd', students}
  ]

  
  
  return (
    <>
    <div className='container'>


    </div>
    </>
  );
  
}
interface StudentDTO {
  id: number;
  name: string;
}
interface GroupDTO {
  id: number;
  name: string;
  students: StudentDTO[]
}
