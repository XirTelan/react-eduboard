import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import SpecialitytForm from '../components/Form/SpecialitytForm';

export default function SpecialityCreate() {
  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Typography variant="h4" color="primary.main">
        Добавить специальность
      </Typography>
      <SpecialitytForm />
    </Box>
  );
}
