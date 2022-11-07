import { ReactNode, useState } from 'react';
import { Autocomplete, AutocompleteRenderInputParams, Button, TextField } from '@mui/material';
import AutocompleteField from '../UI/AutocompleteField';
import * as Yup from 'yup';

import { Form, Formik, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';

export default function GroupForm() {
  return (
    <Formik
      initialValues={{ name: '', course: '', teacher: null, speciality: null }}
      onSubmit={(value) => {
        console.log(value);
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required')
      })}>
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <div className="d-flex gap-3">
              <TextField
                {...formikProps.getFieldProps('name')}
                margin="normal"
                label="Наименование"
                error={!!formikProps.errors.name}
                sx={{ width: '80%' }}
              />
              {formikProps.errors.name && formikProps.touched.name && (
                <h4> {formikProps.errors.name}</h4>
              )}
              <TextField
                {...formikProps.getFieldProps('course')}
                margin="normal"
                label="Курс"
                sx={{ width: '20%' }}
              />
            </div>

            <Autocomplete
              id="teacher"
              value={formikProps.values.teacher}
              onBlur={formikProps.handleBlur}
              onChange={(e, value) => formikProps.setFieldValue('teacher', value)}
              options={['Иванов Иван Иванович', 'Кто Где Когда', 'Апельсин Мандарин Яблоко']}
              // getOptionLabel={(elem) => elem.name}
              placeholder="asd"
              renderInput={(params) => <TextField {...params} label="Выбрать куратора" />}
              sx={{ margin: '10px 0' }}
            />
            <Autocomplete
              id="speciality"
              value={formikProps.values.speciality}
              onBlur={formikProps.handleBlur}
              onChange={(e, value) => formikProps.setFieldValue('speciality', value)}
              options={['21231 asdasdasfdasf', '21212 cvcaqsfqwfas', '41654 zxvasfasdasdfasf']}
              // getOptionLabel={(elem) => elem.name}
              placeholder="asd"
              renderInput={(params) => <TextField {...params} label="Выбрать специальность" />}
              sx={{ margin: '10px 0' }}
            />
            <Button disabled={formikProps.isSubmitting} type="submit">
              Save Changes
            </Button>
            <Link className="btn btn-secondary m-1" to="/users">
              Cancel
            </Link>
          </Form>
        );
      }}
    </Formik>
  );
}

interface specilityDTO {
  id: number;
  name: string;
}
