import {  useEffect, useState } from 'react';
import { Autocomplete, Button, TextField, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import * as Yup from 'yup';

import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { Link } from 'react-router-dom';
import { groupCreationDTO,  specialityDTO,  userViewDTO } from '../../types';
import { urlAccounts,  urlSpecialities } from '../../endpoints';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { formatYearValue } from '../../utils';
import useAxios from '../../hooks/useAxios';

export default function GroupForm(props: groupFormProps) {
  const axiosPrivate = useAxios();
  const [specialityOptions, setSpecialityOptions] = useState<specialityDTO[]>([]);
  const [selectedUser, setSelectedUser] = useState<userViewDTO | null>(() => {
    const model = props.model as any;
    if (!model.person) return null;
    return model.person.id === '' ? null : model.person;
  });
  const [selectedSpeciality, setSelectedSpeciality] = useState<specialityDTO | null>(() => {
    const model = props.model as any;
    if (!model.speciality) return null;
    return model.speciality.id === '' ? null : model.speciality;
  });
  const [usersOptions, setUsersOptions] = useState<userViewDTO[]>([]);

  useEffect(() => {
    async function loadSpecialities() {
      try {
        const response = await axiosPrivate.get(`${urlSpecialities}/getall`);
        setSpecialityOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    async function loadUsers() {
      try {
        const response = await axiosPrivate.get(`${urlAccounts}/getall`);
        setUsersOptions(response.data);
      } catch (error) {
        console.log(error);
      }
    }

    loadUsers();
    loadSpecialities();
  }, []);

  return (
    <Formik
      initialValues={props.model}
      onSubmit={(value, actions) => {
        value.personId = selectedUser?.id;
        value.specialityId = selectedSpeciality?.id;
        value.year = formatYearValue(value.year);
        props.onSubmit(value, actions);
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
                    formikProps.setFieldValue('year', newValue);
                  }}
                  renderInput={(params) => <TextField {...params} helperText={null} />}
                />
              </LocalizationProvider>
            </div>

            <Autocomplete
              id="teacher"
              value={selectedUser}
              onBlur={formikProps.handleBlur}
              options={usersOptions}
              onChange={(e, value) => {
                setSelectedUser(value);
                // formikProps.setFieldValue('personId', value?.id);
              }}
              isOptionEqualToValue={(elem, val) => {
                return elem.id == val.id;
              }}
              getOptionLabel={(elem) => elem.fio}
              placeholder="asd"
              renderInput={(params) => <TextField {...params} label="Выбрать куратора" />}
              sx={{ margin: '10px 0' }}
            />
            <Autocomplete
              id="speciality"
              value={selectedSpeciality}
              onBlur={formikProps.handleBlur}
              options={specialityOptions}
              isOptionEqualToValue={(elem, val) => elem.id == val.id}
              getOptionLabel={(elem) => elem.name}
              onChange={(e, value) => {
                // formikProps.setFieldValue('specialityId', value?.id);

                setSelectedSpeciality(value);
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

interface groupFormProps {
  model: groupCreationDTO;
  selectedSpeciality?: string;
  onSubmit(values: groupCreationDTO, actions: FormikHelpers<groupCreationDTO>): void;
}
