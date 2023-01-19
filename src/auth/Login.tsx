import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField
} from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';

import { authenticationResponse, userCredentials } from './auth.model';
import { urlAccounts } from '../endpoints';
import useAuth from '../hooks/useAuth';
import BgStyle from '../components/UI/BgStyle';
import './Login.css';

export default function Login() {
  const { setAuth, persist, setPersist } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    localStorage.setItem('persist', persist.toString());
  }, [persist]);

  const togglePersist = () => {
    setPersist((prevVal: boolean) => !prevVal);
  };

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
      const data = errors.response?.data as {
        status: string;
        message: string;
      };
      setIsSubmitting(false);
      Swal.fire('Ошибка', data.message, 'error');
    }
  }

  return (
    <>
      <BgStyle position="center">
        <Formik
          initialValues={{ userName: '', password: '' }}
          onSubmit={async (values) => {
            login(values);
          }}>
          {(formikProps) => (
            <Form className="" onSubmit={formikProps.handleSubmit}>
              <div
                id="login-form"
                style={{
                  backdropFilter: 'blur(10px)',
                  backgroundColor: 'rgba(255,255,255,0.1)'
                }}
                className={`shadow  p-2 ${isSubmitting ? 'active ' : ''}`}>
                <div
                  className={`login-form-inner   shadow-lg d-flex flex-column justify-content-center flex-grow-1   ${
                    isSubmitting ? 'active ' : 'bg-white'
                  }`}>
                  <div className="p-3 d-flex flex-grow-1 flex-column gap-3">
                    <TextField
                      autoComplete="username"
                      className={`mb-1 input-field ${isSubmitting ? 'active' : ''}`}
                      label="Имя пользователя"
                      fullWidth
                      {...formikProps.getFieldProps('userName')}
                      onChange={formikProps.handleChange}
                      type="text"></TextField>
                    <FormControl variant="outlined">
                      <InputLabel htmlFor="outlined-adornment-password">Пароль</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete="current-password"
                        {...formikProps.getFieldProps('password')}
                        onChange={formikProps.handleChange}
                        className={`input-field ${isSubmitting ? 'active' : ''}`}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword((prev) => !prev)}
                              onMouseDown={(e) => e.preventDefault()}
                              edge="end">
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Пароль"
                      />
                    </FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={persist}
                          onChange={togglePersist}
                          inputProps={{ 'aria-label': 'controlled' }}
                        />
                      }
                      label="Запомнить это устройство"
                    />
                    <Button
                      fullWidth
                      color="success"
                      variant="contained"
                      type="submit"
                      className={`input-field ${isSubmitting ? 'active' : ''}`}>
                      <div className="d-flex align-items-center justify-content-center">
                        <span className="me-1">Вход</span>
                        <ArrowCircleRightOutlinedIcon sx={{ fontSize: '2rem' }} />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </BgStyle>
    </>
  );
}
