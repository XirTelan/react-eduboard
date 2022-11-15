import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import GroupForm from '../components/Form/GroupForm';
import Header from '../components/UI/Header';

export default function GroupCreate() {
  return (
    <>
      <Header title=" Создать группу" />
      <Box className="bg-white p-3 mx-2 rounded">
        <GroupForm />
      </Box>
    </>
  );
}
