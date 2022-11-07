import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import Button from '../components/UI/Button';
import * as Yup from 'yup';
import DateField from '../components/UI/DateField';
import { Box, FormControl, TextField, InputLabel, MenuItem, Select } from '@mui/material';
import Header from '../components/UI/Header';

export default function CreateUser() {
  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Header title="Добавить пользователя" />
        <Formik
          initialValues={{ name: '' }}
          onSubmit={(value) => {
            console.log(value);
          }}
          validationSchema={Yup.object({
            name: Yup.string().required('This field is required')
          })}>
          {(formikProps) => (
            <Form>
              <div className="d-flex flex-column gap-3">
                <TextField fullWidth label="Логин" />
                <TextField fullWidth label="ФИО" />
                <TextField fullWidth type="password" label="Пароль" />
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
              <Button disabled={formikProps.isSubmitting} type="submit">
                Save Changes
              </Button>
              <Link className="btn btn-secondary m-1" to="/users">
                Cancel
              </Link>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
