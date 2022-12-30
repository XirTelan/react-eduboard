import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import Header from '../components/UI/Header';
import { userRegisterCredentials } from './auth.model';

export default function AuthForm(props: authFormProps) {
  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Header title="Добавить пользователя" />
        <Formik
          initialValues={props.model}
          onSubmit={props.onSubmit}
          validationSchema={Yup.object({
            userName: Yup.string().required('Req'),
            password: Yup.string()
              .required('Req')
              .matches(/[a-z]+/, 'One lowercase character')
              .matches(/[A-Z]+/, 'One uppercase character')
              .matches(/[@$!%*#?&]+/, 'One special character')
              .matches(/\d+/, 'One number')
              .min(8, 'Must be exactly 8 digits'),

            fio: Yup.string().required('Req')
          })}>
          {(formikProps) => (
            <Form>
              <div className="d-flex flex-column gap-3">
                <TextField fullWidth {...formikProps.getFieldProps('userName')} label="Логин" />
                <ErrorMessage name="userName" />
                <TextField fullWidth {...formikProps.getFieldProps('fio')} label="ФИО" />
                <ErrorMessage name="fio" />
                <TextField
                  fullWidth
                  {...formikProps.getFieldProps('password')}
                  type="password"
                  label="Пароль"
                />
                <ErrorMessage name="password" />
              </div>

              {/* <DateField field="date" displayName="Date" /> */}
              <Link className="btn btn-secondary m-1" to="/users">
                Cancel
              </Link>
              <Button
                disabled={formikProps.isSubmitting}
                variant="contained"
                color="success"
                type="submit">
                Save Changes
              </Button>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

interface authFormProps {
  model: userRegisterCredentials;
  onSubmit(values: userRegisterCredentials, actions: FormikHelpers<userRegisterCredentials>): void;
}
