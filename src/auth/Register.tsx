import axios from 'axios';
import { useContext } from 'react';
import { urlAccounts } from '../endpoints';
import { authenticationResponse, userCredentials } from './auth.model';
import AuthenticationContext from './AuthenticationContext';
import AuthForm from './AuthForm';
import { getClaims, saveToken } from './handleJWT';

export default function Register() {
  const { update } = useContext(AuthenticationContext);

  async function register(credentials: userCredentials) {
    try {
      const response = await axios.post<authenticationResponse>(
        `${urlAccounts}/create`,
        credentials
      );
      saveToken(response.data);
      update(getClaims());
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
