import axios, { AxiosError } from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { urlAccounts } from '../endpoints';
import { authenticationResponse, userCredentials, userRegisterCredentials } from './auth.model';
import AuthenticationContext from './AuthenticationContext';
import AuthForm from './AuthForm';

export default function Register() {
  const { update } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  async function register(credentials: userRegisterCredentials) {
    try {
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
        credentials
      );
      Swal.fire('Success', 'Пользователь успешно создан');
      navigate('/users');
    } catch (error) {
      const axiosError = error as AxiosError;
      Swal.fire(
        `Ошибка ${axiosError.code}`,
        `Не удалось создать пользователя ${axiosError.message}`
      );
    }
  }
  return (
    <>
      <AuthForm
        model={{ userName: '', password: '', fio: '' }}
        onSubmit={async (value) => await register(value)}
      />
    </>
  );
}
