import { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import * as Yup from 'yup';

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';

import { months } from '../data/data';
import { urlGroups } from '../endpoints';
import { formatYearValue } from '../utils/utils';
import { displayErrorToast } from '../utils/swalToast';
import useAxios from '../hooks/useAxios';

export default function Filter(props: FilterProps) {
  const [groupsList, setGroupsList] = useState<{ id: number; name: string }[]>([]);
  const axiosPrivate = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPrivate.get(`${urlGroups}/getindexlist`);
        setGroupsList(response.data);
      } catch (error) {
        displayErrorToast(error);
      }
    };
    fetchData();
  }, []);

  const initialValue: FiterGroupForm = {
    groupId: 0,
    year: new Date().getFullYear().toString(),
    month: props.period === 'monthly' ? new Date().getMonth() + 1 : 1
  };

  return (
    <>
      <Box className="bg-white mb-1 p-3 mx-2 rounded d-flex justify-content-center">
        <Formik
          initialValues={initialValue}
          onSubmit={(submitValue) => {
            submitValue.year = formatYearValue(submitValue.year);
            props.onSubmit(submitValue.groupId, submitValue.year, submitValue.month);
          }}
          validationSchema={Yup.object({
            groupId: Yup.number().required('Данное поле обязательно').min(1, 'Не может быть пустым')
          })}>
          {(formikProps) => (
            <Form
              onSubmit={formikProps.handleSubmit}
              className="d-flex justify-content-center w-100 m-auto">
              {groupsList.length == 0 ? (
                <CircularProgress />
              ) : (
                <div className="d-flex align-items-center">
                  <div className="d-flex flex-column ">
                    <div className="d-flex  gap-3 align-items-center  justify-content-center">
                      <div className="w-50">
                        <FormControl fullWidth sx={{ minWidth: 220 }}>
                          <Autocomplete
                            fullWidth
                            id="typeahead"
                            options={groupsList}
                            getOptionLabel={(elem) => elem.name}
                            placeholder="asd"
                            onChange={(event, value) => {
                              formikProps.setFieldValue('groupId', value?.id);
                            }}
                            renderInput={(params) => (
                              <TextField
                                {...params}
                                error={
                                  !!(formikProps.errors.groupId && formikProps.touched.groupId)
                                }
                                label="Выбрать группу"
                              />
                            )}
                          />
                          <ErrorMessage name="groupId" />
                        </FormControl>
                      </div>
                      {props.period != 'none' && (
                        <div className="col-auto">
                          <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="month-select">
                              {props.period === 'monthly' ? 'Месяц' : 'Период'}
                            </InputLabel>
                            <Select
                              labelId="month-select"
                              id="month-select"
                              value={formikProps.values.month}
                              label={props.period === 'monthly' ? 'Месяц' : 'Период'}
                              onChange={(val) => {
                                formikProps.setFieldValue('month', val.target.value);
                              }}>
                              {props.period === 'monthly' &&
                                months.map((elem, index) => (
                                  <MenuItem key={index} value={elem.id}>
                                    {elem.label}
                                  </MenuItem>
                                ))}
                              {props.period === 'half' && [
                                <MenuItem key={1} value={1}>
                                  1-я половина
                                </MenuItem>,
                                <MenuItem key={2} value={2}>
                                  2-я половина
                                </MenuItem>
                              ]}
                            </Select>
                          </FormControl>
                        </div>
                      )}
                      <div className="col-auto">
                        {props.isYearSelectable && (
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                              {...formikProps.getFieldProps('year')}
                              views={['year']}
                              openTo="year"
                              label="Год "
                              value={formikProps.values.year}
                              onChange={(newValue) => {
                                formikProps.setFieldValue('year', newValue);
                              }}
                              renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                          </LocalizationProvider>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="d-flex ms-3" style={{ width: '80px' }}>
                    <Button fullWidth variant="contained" color="success" type="submit">
                      <SearchIcon className="fs-1" />
                    </Button>
                  </div>
                </div>
              )}
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

interface FilterProps {
  period: 'none' | 'half' | 'monthly';
  isYearSelectable?: boolean;
  onSubmit(id: number, year: string, month: number): void;
}
interface FiterGroupForm {
  groupId: number;
  year: string;
  month: number;
}
Filter.defaulProps = {
  periodicity: 'none'
};
