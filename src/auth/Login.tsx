import { Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
// import { squreBackground } from '../App';
import './Login.css';
import { useContext, useState } from 'react';
import { authenticationResponse, userCredentials } from './auth.model';
import axios, { AxiosError } from 'axios';
import { urlAccounts } from '../endpoints';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import useAuth from '../hooks/useAuth';
import BgStyle from '../components/UI/BgStyle';

export default function Login() {
  const { setAuth } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  async function login(credentials: userCredentials) {
    setIsSubmitting(true);
    try {
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/login`,
        credentials,
        { withCredentials: true }
      );
      setAuth(response.data);
      setIsSubmitting(false);
      navigate(from, { replace: true });
    } catch (error) {
      const errors = error as AxiosError;
      setIsSubmitting(false);
      Swal.fire('Ошибка', errors.message, 'error');
    }
  }

  return (
    <>
      <div className="vh-100 vw-100 d-flex overflow-hidden align-items-center position-relative justify-content-center">
        {/* {squreBackground('45deg', '0', '50px')}
        {squreBackground('225deg', undefined, undefined, 0, 0)} */}
        {/* {squreBackground('225deg')} */}

        <Formik
          initialValues={{ userName: '', password: '' }}
          onSubmit={async (values) => {
            login(values);
          }}>
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div
                id="login-form"
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                className={`shadow  p-3 ${isSubmitting ? 'active ' : ''}`}>
                <div
                  className={`login-form-inner d-flex justify-content-center   ${
                    isSubmitting ? 'active ' : 'bg-white'
                  }`}>
                  <div className="p-3">
                    <TextField
                      autoComplete="username"
                      className={`mb-1 input-field ${isSubmitting ? 'active' : ''}`}
                      label="login"
                      fullWidth
                      {...formikProps.getFieldProps('userName')}
                      onChange={formikProps.handleChange}
                      type="text"></TextField>
                    <TextField
                      autoComplete="current-password"
                      className={`input-field ${isSubmitting ? 'active' : ''}`}
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
                      className={`input-field ${isSubmitting ? 'active' : ''}`}>
                      <ArrowCircleRightOutlinedIcon sx={{ fontSize: '2rem' }} />
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
        <BgStyle />
      </div>
    </>
  );
}

interface LoginProps {
  onChange(login: string, password: string): Promise<boolean>;
}
