import { Input, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import Button from '../components/UI/Button';

export default function Login({ onChange }: LoginProps) {
  return (
    <>
      <div className="vh-100 vw-100 d-flex align-items-center justify-content-center">
        <div className="card shadow">
          <Formik
            initialValues={{ login: '', password: '' }}
            onSubmit={(e) => onChange(e.login, e.password)}>
            {(formikProps) => (
              <Form onSubmit={formikProps.handleSubmit}>
                <div className="p-3">
                  <div className="flex flex-column gap-3">
                    <TextField
                      label="login"
                      fullWidth
                      {...formikProps.getFieldProps('login')}
                      onChange={formikProps.handleChange}
                      type="text"></TextField>
                    <TextField
                      label="password"
                      fullWidth
                      {...formikProps.getFieldProps('password')}
                      onChange={formikProps.handleChange}
                      aria-label="Password"
                      type="password"></TextField>
                  </div>
                  <Button type="submit">Вход</Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}

interface LoginProps {
  onChange(login: string, password: string): void;
}
