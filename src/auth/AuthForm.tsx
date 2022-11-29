import { Form, Formik, FormikHelpers } from 'formik';
import { userCredentials } from './auth.model';
import * as Yup from 'yup';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Header from '../components/UI/Header';
import { Link } from 'react-router-dom';
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
            password: Yup.string().required('Req')
          })}>
          {(formikProps) => (
            <Form>
              <div className="d-flex flex-column gap-3">
                <TextField fullWidth {...formikProps.getFieldProps('userName')} label="Логин" />
                <TextField fullWidth label="ФИО" />
                <TextField
                  fullWidth
                  {...formikProps.getFieldProps('password')}
                  type="password"
                  label="Пароль"
                />
              </div>
              <FormControl style={{ marginTop: 20, marginBottom: 20 }} fullWidth size="small">
                <InputLabel id="role-select-label">Выберите роль</InputLabel>
                <Select
                  labelId="role-select-label"
                  label="Выберите роль"
                  placeholder="Выберите роль">
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              {/* <DateField field="date" displayName="Date" /> */}
              <Link className="btn btn-secondary m-1" to="/users">
                Cancel
              </Link>
              <Button disabled={formikProps.isSubmitting} variant='contained' color='success' type="submit">
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
  model: userCredentials;
  onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
}
