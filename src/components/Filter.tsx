import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { idText } from 'typescript';
import Button from './UI/Button';
interface groupDTO {
  id: number;
  name: string;
}
interface IFilterTimeline {
  yearFilter?: boolean;
}
interface FiterGroupForm {
  title: string;
  groupId: number;
}

export default function Filter({ yearFilter }: IFilterTimeline) {
  const groups: groupDTO[] = [
    { id: 1, name: 'ОО-001' },
    { id: 2, name: 'АА-002' }
  ];
  const [year, setYear] = useState('2022');
  const [course, setCourse] = useState(0);
  const [groupSelected, setGroupSelected] = useState(1);
  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setGroupSelected(+event.target.value);
  };
  const handleChangeCourse = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setGroupSelected(+event.target.value);
  };
  const handleChangeYear = (event: SelectChangeEvent) => {
    setYear(event.target.value);
    console.log(year);
  };

  const initialValue: FiterGroupForm = {
    title: '',
    groupId: 1
  };

  return (
    <>
      <Box className="d-flex my-4 justify-content-center">
        <Formik initialValues={initialValue} onSubmit={(submitValue) => console.log(submitValue)}>
          {(formikProps) => (
            <Form>
              <div className="row gx-3 ">
                <div className="col-auto d-flex gap-3 align-items-center">
                  <FormControl sx={{ minWidth: 220 }}>
                    <InputLabel id="year-select-label">Курс</InputLabel>
                    <Select
                      value={course.toString()}
                      labelId="course-select-label"
                      label="Course"
                      onChange={handleChangeCourse}>
                      <MenuItem value={0}>Все</MenuItem>
                      <MenuItem value={1}>1</MenuItem>
                      <MenuItem value={2}>2</MenuItem>
                      <MenuItem value={3}>3</MenuItem>
                      <MenuItem value={4}>4</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="col-auto">
                  <FormControl sx={{ marginRight: 1, minWidth: 220 }}>
                    <InputLabel id="group-select-label">Группа</InputLabel>
                    <Select
                      labelId="group-select-label"
                      label="Group"
                      {...formikProps.getFieldProps('groupId')}>
                      {groups.map((group) => (
                        <MenuItem key={group.id} value={group.id}>
                          {group.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                {yearFilter && (
                  <div className="col-auto">
                    <FormControl sx={{ minWidth: 220 }}>
                      <InputLabel id="year-select-label">Год</InputLabel>
                      <Select
                        value={year}
                        labelId="year-select-label"
                        label="Year"
                        onChange={handleChangeYear}>
                        <MenuItem value={2022}>2022</MenuItem>
                        <MenuItem value={2021}>2021</MenuItem>
                        <MenuItem value={2020}>2020</MenuItem>
                        <MenuItem value={2019}>2019</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                )}
                <div className="col-auto">
                  <Button className="btn btn-primary" onClick={() => formikProps.submitForm()}>
                    Загрузить
                  </Button>
                  <Button
                    className="btn btn-danger ms-3"
                    onClick={() => formikProps.setValues(initialValue)}>
                    Clear
                  </Button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
