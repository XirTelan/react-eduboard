import { ReactNode, useState } from 'react';
import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  TextField,
  Typography
} from '@mui/material';
import AutocompleteField from '../UI/AutocompleteField';
import * as Yup from 'yup';

import { ErrorMessage, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import { groupCreationDTO } from '../../types';

export default function GroupForm(props: groupFormProps) {
  return (
    <Formik
      initialValues={props.model}
      onSubmit={(value, actions) => {
        props.onSubmit(value, actions);
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

              <TextField
                {...formikProps.getFieldProps('course')}
                margin="normal"
                label="Курс"
                sx={{ width: '20%' }}
              />
            </div>

            <Autocomplete
              id="teacher"
              value={formikProps.values.curator}
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
            {formikProps.errors.name && formikProps.touched.name && (
              <>
                <Typography variant="subtitle1">Обнаружены ошибки при заполнении</Typography>
                <ErrorMessage component="div" name="name" />
              </>
            )}
            <Link className="btn btn-secondary m-1" to="/users">
              Cancel
            </Link>
            <Button
              color="success"
              variant="contained"
              disabled={formikProps.isSubmitting}
              type="submit">
              Save Changes
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
}

interface groupFormProps {
  model: groupCreationDTO;
  onSubmit(values: groupCreationDTO, actions: FormikHelpers<groupCreationDTO>): void;
}
