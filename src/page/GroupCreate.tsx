import { Autocomplete, Button, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

export default function GroupCreate() {
  return (
    <Formik
      initialValues={{ name: '' }}
      onSubmit={(value) => {
        console.log(value);
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required')
      })}>
      {(formikProps) => (
        <Form>
          {/* <TextField field="name" displayName="Name" /> */}
          <TextField />
          <Autocomplete
            id="typeahead"
            options={['1']}
            //   getOptionLabel={(disciplines) => disciplines.name}
            placeholder="asd"
            renderInput={(params) => <TextField {...params} />}
          />
          <Autocomplete
            id="typeahead"
            options={['1']}
            //   getOptionLabel={(disciplines) => disciplines.name}
            placeholder="asd"
            renderInput={(params) => <TextField {...params} />}
          />
          <Button disabled={formikProps.isSubmitting} type="submit">
            Save Changes
          </Button>
          <Link className="btn btn-secondary m-1" to="/users">
            Cancel
          </Link>
        </Form>
      )}
    </Formik>
  );
}
