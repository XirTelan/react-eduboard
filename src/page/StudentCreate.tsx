import { useNavigate } from 'react-router-dom';
import StudentForm from '../components/Form/StudentForm';
import Header from '../components/UI/Header';
import { urlStudents } from '../endpoints';
import useAxios from '../hooks/useAxios';
import { studentCreationDTO } from '../types';
import { displayErrorToast } from '../utils/swalToast';

export default function StudentCreate() {
  const navigate = useNavigate();
  const axiosPrivate = useAxios();

  async function create(student: studentCreationDTO) {
    try {
      await axiosPrivate.post(urlStudents, student);
      navigate('/students');
    } catch (error) {
      displayErrorToast(error);
    }
  }
  return (
    <>
      <Header title="Добавить студента" />
      <StudentForm
        model={{ firstName: '', secondName: '', middleName: '', groupId: undefined }}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
}
