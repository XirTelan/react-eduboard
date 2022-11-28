import axios from 'axios';
import { urlAccounts } from '../endpoints';
import { authenticationResponse, userCredentials } from './auth.model';
import AuthForm from './AuthForm';

export default function Register() {
  async function register(credentials: userCredentials) {
    try {
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
        credentials
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <AuthForm
        model={{ userName: '', password: '' }}
        onSubmit={async (value) => await register(value)}
      />
    </>
  );
}
