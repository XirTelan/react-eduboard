import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import EditEntity from '../components/Entities/EditEntity';
import GroupForm from '../components/Form/GroupForm';
import Header from '../components/UI/Header';
import { urlSpecialities } from '../endpoints';
import { groupCreationDTO, groupDTO, specialityCreationDTO } from '../types';

export default function GroupCreate() {
  const navigate = useNavigate();

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
      <Header title=" Создать группу" />
      <Box className="bg-white p-3 mx-2 rounded">
        <GroupForm model={{ name: '', speciality: '' }} onSubmit={(values) => create(values)} />
      </Box>
    </>
  );
}
