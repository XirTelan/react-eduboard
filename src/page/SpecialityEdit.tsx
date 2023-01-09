import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import SpecialityForm from '../components/Form/SpecialitytForm';
import Header from '../components/UI/Header';
import {  urlSpecialities } from '../endpoints';
import useAxios from '../hooks/useAxios';
import { specialityCreationDTO,  specialityEditDTO } from '../types';
import { displayErrorToast } from '../utils/swalToast';

export default function SpecialityEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosPrivate = useAxios();

  const [specialityEdit, setSpecialityEdit] = useState<specialityEditDTO>();
  const [speciality, setSpeciality] = useState<specialityCreationDTO>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    get();
  }, []);

  async function get() {
    try {
      const response = (await axiosPrivate.get(`${urlSpecialities}/edit/${id}`)) as AxiosResponse<
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
      await axiosPrivate.put(`${urlSpecialities}/${id}`, speciality).then(() => navigate('/specialities'));
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
