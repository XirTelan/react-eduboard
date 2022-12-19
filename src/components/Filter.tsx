import { useEffect, useState } from 'react';
import { ErrorMessage, Form, Formik } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';

import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import SearchIcon from '@mui/icons-material/Search';

import { months } from '../data/data';
import { urlGroups } from '../endpoints';
import { formatYearValue } from '../utils';

export default function Filter(props: FilterProps) {
  const [groupsList, setGroupsList] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlGroups}/getindexlist`);
        console.log(response.data);
        setGroupsList(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const initialValue: FiterGroupForm = {
    groupId: 0,
    year: new Date().getFullYear().toString(),
    month: props.period === 'monthly' ? 9 : 1
  };

  return (
    <>
      <Box className="bg-white mb-1 p-3 mx-2 rounded d-flex justify-content-center">
        <Formik
          initialValues={initialValue}
          onSubmit={(submitValue) => {
            console.log(submitValue);
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
                    <div className="d-flex  gap-3  justify-content-center">
                      <div className="w-50">
                        <FormControl fullWidth sx={{ minWidth: 220 }}>
                          <Autocomplete
                            fullWidth
                            id="typeahead"
                            options={groupsList}
                            getOptionLabel={(elem) => elem.name}
                            placeholder="asd"
                            onChange={(event, value) => {
                              console.log(value);
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
                                console.log('newValue', newValue);
                                formikProps.setFieldValue('year', newValue);
                              }}
                              renderInput={(params) => <TextField {...params} helperText={null} />}
                            />
                          </LocalizationProvider>
                        )}
                      </div>
                    </div>
                    <div>
                      {props.period === 'monthly' && (
                        <div className="d-flex justify-content-center">
                          <div className="d-flex ">
                            <RadioGroup
                              row
                              value={formikProps.values.month}
                              onChange={(_, newValue) => {
                                formikProps.setFieldValue('month', newValue);
                              }}
                              name="radio-buttons-group">
                              {months.map((elem, index) => (
                                <div key={index}>
                                  <FormControlLabel
                                    value={elem.id}
                                    control={<Radio />}
                                    label={elem.label}
                                  />
                                </div>
                              ))}
                            </RadioGroup>
                          </div>
                        </div>
                      )}
                      {props.period === 'half' && (
                        <div className="d-flex justify-content-center align-items-center">
                          <RadioGroup
                            row
                            value={formikProps.values.month}
                            onChange={(_, newValue) => {
                              formikProps.setFieldValue('month', newValue);
                            }}
                            name="radio-buttons-group">
                            <div>
                              <FormControlLabel
                                value={1}
                                control={<Radio />}
                                label="1-я половина"
                              />
                            </div>
                            <div>
                              <FormControlLabel
                                value={2}
                                control={<Radio />}
                                label="2-я половина"
                              />
                            </div>
                          </RadioGroup>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="d-flex ms-3" style={{ width: '80px', height: '80px' }}>
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
