import { Button, Input, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { squreBackground } from '../App';
import './Login.css';

export default function Login({ onChange }: LoginProps) {
  return (
    <>
      <div className="vh-100 vw-100 d-flex overflow-hidden align-items-center position-relative justify-content-center">
        {squreBackground('45deg', '0', '50px')}
        {squreBackground('225deg', undefined, undefined, 0, 0)}
        {/* {squreBackground('225deg')} */}

        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={(e) => onChange(e.login, e.password)}>
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div
                id="login-form"
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                className={`shadow  p-3 ${formikProps.isSubmitting ? 'active ' : ''}`}>
                <div
                  className={`login-form-inner d-flex justify-content-center   ${
                    formikProps.isSubmitting ? 'active ' : 'bg-white'
                  }`}>
                  <div className="p-3">
                    <TextField
                      className={`mb-1 input-field ${formikProps.isSubmitting ? 'active' : ''}`}
                      label="login"
                      fullWidth
                      {...formikProps.getFieldProps('login')}
                      onChange={formikProps.handleChange}
                      type="text"></TextField>
                    <TextField
                      className={`input-field ${formikProps.isSubmitting ? 'active' : ''}`}
                      label="password"
                      fullWidth
                      {...formikProps.getFieldProps('password')}
                      onChange={formikProps.handleChange}
                      aria-label="Password"
                      type="password"></TextField>
                  </div>
                  <div className="p-1 mx-3 align-self-center">
                    <Button
                      sx={{ width: '5rem', height: '5rem' }}
                      color="success"
                      variant="contained"
                      type="submit"
                      className={`input-field ${formikProps.isSubmitting ? 'active' : ''}`}>
                      <ArrowCircleRightOutlinedIcon sx={{ fontSize: '2rem' }} />
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}

interface LoginProps {
  onChange(login: string, password: string): void;
}
