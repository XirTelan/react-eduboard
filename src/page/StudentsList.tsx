import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { useState } from 'react';
import DragDropFile from '../components/DragDropFile';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlStudents } from '../endpoints';
import { studentDTO } from '../types';
import { excelImport } from '../utils/handleExcel';

export default function StudentsList() {
  const [seacrhString, setSearchString] = useState('');

  return (
    <>
      <Header title="Список студентов" buttonLink="create" buttonText="Добавить студента">
        <DragDropFile handleFiles={excelImport} />
        {/* <Button
          className="me-1"
          onClick={() => console.log('Custom')}
          color="success"
          variant="contained"
          size="large">
          Импорт
        </Button> */}
      </Header>
      <Box className="bg-white p-3 mx-2 mb-1 rounded">
        <TextField
          fullWidth
          label="Поиск студента"
          variant="standard"
          value={seacrhString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </Box>
      <IndexEntity<studentDTO> urlEntity={urlStudents} isCustom>
        {(students, deleteEntity) => (
          <>
            <TableContainer className="mt-3" component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow sx={{ width: 200 }}>
                    <TableCell
                      sx={{ fontWeight: 'bold', fontSize: '1rem' }}
                      width="50px"
                      align="center">
                      №
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 'bold', fontSize: '1.125rem' }}
                      variant="head"
                      align="left">
                      Фамилия
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} align="left">
                      Имя
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} align="left">
                      Отчество
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student, index) => {
                    return (
                      <TableRow
                        key={student.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="left">{index + 1}</TableCell>
                        <TableCell align="left">{student.secondName}</TableCell>
                        <TableCell align="left"> {student.firstName}</TableCell>
                        <TableCell align="left"> {student.middleName}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </IndexEntity>
    </>
  );
}
