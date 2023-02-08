import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SpecialitytForm from '../components/Form/SpecialitytForm';
import Header from '../components/UI/Header';
import { urlDisciplines, urlSpecialities } from '../endpoints';
import useAxios from '../hooks/useAxios';
import { DisciplineDTO, SpecialityCreationDTO } from '../data/types';
import { showAxiosErrorToast } from '../utils/notificationToast';

export default function SpecialityCreate() {
  const [disciplines, setDisciplines] = useState<DisciplineDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const axiosPrivate = useAxios();

  useEffect(() => {
    axiosPrivate
      .get(`${urlDisciplines}/getall`)
      .then((response: AxiosResponse<DisciplineDTO[]>) => {
        setDisciplines(response.data);
        setLoading(false);
      });
  }, []);

  async function create(speciality: SpecialityCreationDTO) {
    try {
      await axiosPrivate.post(urlSpecialities, speciality);
      navigate('/specialities');
    } catch (error) {
      showAxiosErrorToast(error);
    }
  }
  return (
    <>
      <Header title="Добавить специальность" />
      {!loading ? (
        <SpecialitytForm
          model={{ name: '', disciplineIds: [] }}
          seletedDisciplined={[]}
          nonSelectedDisciplines={disciplines}
          onSubmit={async (values) => await create(values)}
        />
      ) : (
        'Loading'
      )}
    </>
  );
}
