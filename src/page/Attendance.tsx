import {
  Box,
  Button,
  Divider,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Typography
} from '@mui/material';
import { useState } from 'react';
import Filter from '../components/Filter';
import { months } from '../data/data';

export default function Attendance() {
  const [month, setMonth] = useState('Сентябрь');

  const handleChangeMonth = (event: SelectChangeEvent) => {
    console.log(`month ${month}`);
    setMonth(event.target.value);
  };
  const days = [...Array(31).keys()].map((e) => e + 1);
  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Typography variant="h3" color="primary.main">
          Посещяемость
        </Typography>
        <Divider className="my-3" />
        <Filter yearFilter />
        <div className="d-flex justify-content-center">
          <div className="d-flex me-3 gap-3">
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              value={month}
              onChange={handleChangeMonth}
              name="radio-buttons-group">
              {months.map((elem, index) => (
                <FormControlLabel key={index} value={elem} control={<Radio />} label={elem} />
              ))}
            </RadioGroup>
          </div>
        </div>

        <table className="table table-hover mt-2 bg-white rounded shadow-sm ">
          <thead>
            <tr>
              <th rowSpan={2} scope="col">
                №
              </th>
              <th rowSpan={2} scope="col">
                ФИО Студента
              </th>
              <th colSpan={days.length - 1} scope="col" className="text-center">
                Дни месяца ({month})
              </th>
            </tr>
            <tr>
              {days.map((e) => {
                return (
                  <th key={e} scope="col">
                    {e}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
              <td>1</td>
            </tr>
          </tbody>
        </table>
      </Box>
    </>
  );
}
