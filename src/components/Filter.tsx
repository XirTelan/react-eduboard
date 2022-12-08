import {
  Autocomplete,
  Box,
  Button,
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
import { LocalizationProvider } from '@mui/x-date-pickers';
import * as Yup from 'yup';

import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { ErrorMessage, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { months } from '../data/data';
import { urlGroups } from '../endpoints';
interface groupDTO {
  id: number;
  name: string;
}

export default function Filter(props: FilterProps) {
  const [month, setMonth] = useState(9);
  const [year, setYear] = useState('2022');
  const [course, setCourse] = useState('');
  const [groupsList, setGroupsList] = useState<{ id: number; name: string }[]>([]);
  const [groupSelected, setGroupSelected] = useState<number>(0);

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

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setGroupSelected(+event.target.value);
  };
  const handleChangeMonth = (event: SelectChangeEvent) => {
    console.log(`month ${month}`);
    setMonth(+event.target.value);
  };
  const handleChangeCourse = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setCourse(event.target.value);
  };
  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    console.log(year);
  };

  const initialValue: FiterGroupForm = {
    groupId: groupSelected,
    year: year,
    month: month
  };

  return (
    <>
      <Box className="bg-white mb-1 p-3 mx-2 rounded d-flex justify-content-center">
        <Formik
          initialValues={initialValue}
          onSubmit={(submitValue) => {
            console.log(submitValue);
            props.onSubmit(submitValue.groupId, submitValue.year, submitValue.month);
          }}
          validationSchema={Yup.object({
            groupId: Yup.number().required('Данное поле обязательно').min(1, 'Не может быть пустым')
          })}>
          {(formikProps) => (
            <Form onSubmit={formikProps.handleSubmit}>
              <div className="d-flex ">
                <div className="d-flex flex-column ">
                  <div className="d-flex  gap-3 justify-content-center">
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
                              error={!!(formikProps.errors.groupId && formikProps.touched.groupId)}
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
                    {props.periodicity === 'monthly' && (
                      <div className="d-flex justify-content-center">
                        <div className="d-flex ">
                          <RadioGroup
                            row
                            aria-labelledby="demo-radio-buttons-group-label"
                            defaultValue="female"
                            value={formikProps.values.month}
                            onChange={(_, newValue) => {
                              console.log('newValue', newValue);

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
                    {props.periodicity === 'half' && (
                      <div className="d-flex justify-content-center align-items-center">
                        <Typography>1-я половина</Typography>
                        <Switch defaultChecked />
                        <Typography>2-я половина</Typography>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <Button variant='contained' type="submit">Submit</Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}

interface FilterProps {
  periodicity: 'none' | 'half' | 'monthly';
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
