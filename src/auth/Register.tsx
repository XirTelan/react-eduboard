import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { urlAccounts } from '../endpoints';
import useAxios from '../hooks/useAxios';
import { showErrorToast, showSuccessToast } from '../utils/notificationToast';
import { authenticationResponse, userRegisterCredentials } from './auth.model';
import AuthForm from './AuthForm';

export default function Register() {
  const navigate = useNavigate();
  const axiosPrivate = useAxios();
  async function register(credentials: userRegisterCredentials) {
    try {
      await axiosPrivate.post<authenticationResponse>(`${urlAccounts}/register`, credentials);
      showSuccessToast('Пользователь успешно создан');
      navigate('/users');
    } catch (error) {
      const axiosError = error as AxiosError;
      showErrorToast(axiosError.message);
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
