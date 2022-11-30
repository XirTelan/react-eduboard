import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import SpecialitytForm from '../components/Form/SpecialitytForm';
import Header from '../components/UI/Header';
import { urlDisciplines, urlSpecialities } from '../endpoints';
import { disciplineDTO, specialityCreationDTO, specialityDTO } from '../types';

export default function SpecialityCreate() {
  const [disciplines, setDisciplines] = useState<disciplineDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${urlDisciplines}/getall`).then((response: AxiosResponse<disciplineDTO[]>) => {
      console.log('response data', response);
      setDisciplines(response.data);
      setLoading(false);
    });
  }, []);

  async function create(speciality: specialityCreationDTO) {
    try {
      await axios.post(urlSpecialities, speciality);
      navigate('/specialities');
    } catch (error) {
      console.error(error);
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
