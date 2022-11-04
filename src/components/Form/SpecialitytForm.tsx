import { Form, Formik } from 'formik';

export default function specialityForm() {
  return (
    <Formik initialValues={{ name: '' }} onSubmit={(val) => console.log(val)}>
      <Form></Form>
    </Formik>
  );
}
