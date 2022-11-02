import { Box, Typography } from '@mui/material';
import { Form, Formik } from 'formik';

export default function CreateSpeciality() {
  return (
    <Box>
      <Typography variant="h3" color="primary.main">
        Добавить специальность
      </Typography>
      <Formik initialValues={{ name: '' }} onSubmit={(val) => console.log(val)}>
        <Form></Form>
      </Formik>
    </Box>
  );
}
