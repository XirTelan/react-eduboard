import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import GroupForm from '../components/Form/GroupForm';

export default function GroupCreate() {
  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Typography
        sx={{ fontWeight: 'bold', alignSelf: 'center' }}
        variant="h4"
        color="primary.main">
        Создать группу
      </Typography>
      <GroupForm />
    </Box>
  );
}
