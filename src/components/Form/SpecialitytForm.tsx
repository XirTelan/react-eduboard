import { Autocomplete, AutocompleteRenderInputParams, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { ReactNode } from 'react';

export default function specialityForm() {
  return (
    <Formik initialValues={{ name: '' }} onSubmit={(val) => console.log(val)}>
      <Form>
        <TextField />
        <Autocomplete
        id="typeahead"
        options={['1']}
        getOptionLabel={() => 'a'}
        placeholder="asd"
        renderInput={(params) => <TextField {...params} label={'props.displayName'} />}
      />
      
      </Form>
    </Formik>
  );
}
