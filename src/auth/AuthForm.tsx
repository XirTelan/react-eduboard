import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { Box, Button, TextField } from '@mui/material';
import { Link } from 'react-router-dom';

import Header from '../components/UI/Header';
import { userRegisterCredentials } from './auth.model';

export default function AuthForm(props: AuthFormProps) {
  const { isEditing } = props;
  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Header title={` ${isEditing ? 'Редактировать' : 'Добавить'} пользователя`} />
        <Formik
          initialValues={props.model}
          onSubmit={props.onSubmit}
          validationSchema={Yup.object({
            userName: Yup.string().required('Req'),
            password: Yup.string()
              .required('Req')
              .matches(/[a-z]+/, 'Один прописной символ')
              .matches(/[A-Z]+/, 'Один заглавный символ')
              .matches(/[@$!%*#?&]+/, 'Один специальный символ (@$!%*#?&)')
              .matches(/\d+/, 'Одна цифра')
              .min(8, 'Минимум 8 символов'),

            fio: Yup.string().required('Req')
          })}>
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div className="d-flex flex-column gap-3">
                <TextField fullWidth {...formikProps.getFieldProps('userName')} label="Логин" />
                <ErrorMessage name="userName" />
                <TextField fullWidth {...formikProps.getFieldProps('fio')} label="ФИО" />
                <ErrorMessage name="fio" />
                {isEditing && <div>Изменить пароль</div>}
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

AuthForm.defaultProps = {
  isEditing: false
};

interface AuthFormProps {
  model: userRegisterCredentials;
  isEditing?: boolean;
  onSubmit(values: userRegisterCredentials, actions: FormikHelpers<userRegisterCredentials>): void;
}
