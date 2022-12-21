import { Box } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import EditEntity from '../components/Entities/EditEntity';
import SpecialityForm from '../components/Form/SpecialitytForm';
import Header from '../components/UI/Header';
import { urlDisciplines, urlSpecialities } from '../endpoints';
import { disciplineDTO, specialityCreationDTO, specialityDTO, specialityEditDTO } from '../types';
import { displayErrorToast } from '../utils/swalToast';

export default function SpecialityEdit() {
  const { id } = useParams();
  const [disciplines, setDisciplines] = useState<disciplineDTO[]>([]);
  const navigate = useNavigate();

  const [specialityEdit, setSpecialityEdit] = useState<specialityEditDTO>();
  const [speciality, setSpeciality] = useState<specialityCreationDTO>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      const response = (await axios.get(`${urlSpecialities}/edit/${id}`)) as AxiosResponse<
        specialityEditDTO,
        any
      >;
      const model: specialityCreationDTO = {
        name: response.data.speciality.name
      };
      setSpeciality(model);
      setSpecialityEdit(response.data);
      setLoading(false);
    } catch (error) {}
  }
  async function edit(speciality: specialityCreationDTO) {
    try {
      await axios.put(`${urlSpecialities}/${id}`, speciality).then(() => navigate('/specialities'));
    } catch (error) {
      displayErrorToast(error);
    }
  }

  return (
    <>
      <Header title="Редактировать специальность" />
      {!loading ? (
        <SpecialityForm
          model={speciality!}
          seletedDisciplined={specialityEdit!.selectedDisciplines}
          nonSelectedDisciplines={specialityEdit!.nonSelectedDisciplines}
          onSubmit={async (values) => await edit(values)}
        />
      ) : (
        <h1>Loading</h1>
      )}
    </>
  );
}
