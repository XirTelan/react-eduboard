import { Button, Input, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';

export default function Login({ onChange }: LoginProps) {
  return (
    <>
      <div className="vh-100 vw-100 d-flex align-items-center justify-content-center">
        <Formik
          initialValues={{ login: '', password: '' }}
          onSubmit={(e) => onChange(e.login, e.password)}>
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                className="shadow rounded d-flex">
                <div className=" m-3 flex-grow-1 d-flex flex-wrap  flex-row bg-white rounded">
                  <div className="p-3 d-flex gap-3 flex-column">
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
                  <div className="p-1 me-3 d-flex flex-grow-1 align-self-center">
                    <Button color="info" variant="contained" type="submit">
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
