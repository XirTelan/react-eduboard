import { Box, Typography } from '@mui/material';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { redirect, useNavigate } from 'react-router-dom';
import SpecialitytForm from '../components/Form/SpecialitytForm';
import AutocompleteField from '../components/UI/AutocompleteField';
import Header from '../components/UI/Header';
import { disciplines } from '../data/data';
import { urlSpecialities } from '../endpoints';
import { specialityCreationDTO, specialityDTO } from '../types';

export default function SpecialityCreate() {
  async function create(speciality: specialityCreationDTO) {
    try {
      await axios.post(urlSpecialities, speciality);
      redirect('/specialities');
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Header title="Добавить специальность" />
      <SpecialitytForm
        model={{ name: '', disciplinesId: [] }}
        seletedDisciplined={[]}
        nonSelectedDisciplines={disciplines}
        onSubmit={async (values) => await create(values)}
      />
    </>
  );
}
