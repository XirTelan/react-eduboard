import { ReactNode, useCallback, useState } from 'react';
import _debounce from 'lodash/debounce';
import {
  Autocomplete,
  Button,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup';

import { ErrorMessage, Form, Formik, FormikHelpers, useFormikContext } from 'formik';
import { Link } from 'react-router-dom';
import { groupCreationDTO, specialityDTO } from '../../types';
import axios from 'axios';
import { urlSpecialities } from '../../endpoints';
import { LocalizationProvider } from '@mui/x-date-pickers';

function handleDebounceFn(
  query: string,
  urlFilter: string,
  setState: React.Dispatch<React.SetStateAction<any>>
) {
  console.log(query);
  if (query == null || query.trim() === '') return;
  try {
    axios
      .get(`${urlFilter}/filter`, {
        params: { query }
      })
      .then((response) => {
        console.log(response.data);
        setState(response.data);
      });
  } catch (error) {
    console.log(error);
  }
}

export default function GroupForm(props: groupFormProps) {
  const debounceFn = useCallback(_debounce(handleDebounceFn, 1000), []);
  const [queryUser, setUserQuery] = useState(
    props.selectedSpeciality ? props.selectedSpeciality : ''
  );
  const [querySpeciality, setSpecialityQuery] = useState('');
  const [specialityOptions, setSpecialityOptions] = useState<specialityDTO[]>([]);
  const [userOptions, setUserOptions] = useState<autocompleteFieldModel[]>([]);

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(value, actions) => {
        value.year =
          value.year.length <= 4 ? value.year.toString() : value.year.toString().split(' ')[3];
        console.log('year', value.year);
        props.onSubmit(value, actions);
        console.log(value);
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('Данное поле обязательно'),
        year: Yup.string().required('Данное поле обязательно')
      })}>
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <div className="d-flex align-items-center gap-3">
              <TextField
                {...formikProps.getFieldProps('name')}
                margin="none"
                label="Наименование"
                error={!!formikProps.errors.name}
                sx={{ width: '80%' }}
                className="flex-grow-1"
              />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  {...formikProps.getFieldProps('year')}
                  views={['year']}
                  openTo="year"
                  label="Год начала обучения"
                  value={formikProps.values.year}
                  onChange={(newValue) => {
                    console.log('newValue', newValue);
                    formikProps.setFieldValue('year', newValue);
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </div>

            <Autocomplete
              id="teacher"
              inputValue={queryUser}
              onBlur={formikProps.handleBlur}
              options={userOptions}
              onChange={(e, value) => {
                formikProps.setFieldValue('curatorId', value!.id);
              }}
              onInputChange={(e, value) => {
                setUserQuery(value);
                debounceFn(value, '/users', setUserOptions);
              }}
              // getOptionLabel={(elem) => elem.name}
              placeholder="asd"
              renderInput={(params) => <TextField {...params} label="Выбрать куратора" />}
              sx={{ margin: '10px 0' }}
            />
            <Autocomplete
              id="speciality"
              inputValue={querySpeciality}
              onBlur={formikProps.handleBlur}
              options={specialityOptions}
              isOptionEqualToValue={(elem, val) => elem.id == val.id}
              getOptionLabel={(elem) => elem.name}
              placeholder="asd"
              onChange={(e, value) => {
                formikProps.setFieldValue('specialityId', value!.id);
              }}
              onInputChange={(e, value) => {
                setSpecialityQuery(value);
                debounceFn(value, urlSpecialities, setSpecialityOptions);
              }}
              renderInput={(params) => <TextField {...params} label="Выбрать специальность" />}
              sx={{ margin: '10px 0' }}
            />
            {formikProps.errors.specialityId && (
              <>
                <Typography variant="subtitle1">Обнаружены ошибки при заполнении</Typography>
                <ErrorMessage component="div" name="name" />
              </>
            )}
            <Link className="btn btn-secondary m-1" to="/groups">
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
interface autocompleteFieldModel {
  id: number;
  name: string;
}

interface groupFormProps {
  model: groupCreationDTO;
  selectedSpeciality?: string;
  onSubmit(values: groupCreationDTO, actions: FormikHelpers<groupCreationDTO>): void;
}
