import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import SpecialitytForm from '../components/Form/SpecialitytForm';
import AutocompleteField from '../components/UI/AutocompleteField';
import Header from '../components/UI/Header';

export default function SpecialityCreate() {
  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Header title="Добавить специальность" />
      <SpecialitytForm />
    </Box>
  );
}
