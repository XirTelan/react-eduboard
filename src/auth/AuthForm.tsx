import { Form, Formik, FormikHelpers } from 'formik';
import { userCredentials } from './auth.model';
import * as Yup from 'yup';
import { Button, TextField } from '@mui/material';
export default function AuthForm(props: authFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={props.onSubmit}
      validationSchema={Yup.object({
        userName: Yup.string().required('Req'),
        password: Yup.string().required('Req')
      })}>
      {(formikProps) => (
        <Form>
          <TextField {...formikProps.getFieldProps('userName')} label="UserName" />
          <TextField {...formikProps.getFieldProps('password')} label="Password" type="password" />
          <Button type="submit">Create</Button>
          
        </Form>
      )}
    </Formik>
  );
}

interface authFormProps {
  model: userCredentials;
  onSubmit(values: userCredentials, actions: FormikHelpers<userCredentials>): void;
}
