import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField
} from '@mui/material';
import { id } from 'date-fns/locale';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragDropFile from '../components/DragDropFile';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlStudents } from '../endpoints';
import { studentDTO } from '../types';
import { customAlert } from '../utils';
import { excelImport } from '../utils/handleExcel';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export default function StudentsList() {
  const [seacrhString, setSearchString] = useState('');
  const navigate = useNavigate();

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
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} align="right">
                      Действия
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
                        <TableCell align="right">
                          <div className="align-self-center">
                            <IconButton
                              color="success"
                              onClick={() => navigate(`edit/${student.id}`)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() =>
                                customAlert(`Удалить ${student.firstName}?`, 'Удалить', () =>
                                  deleteEntity(student.id)
                                )
                              }>
                              <DeleteForeverSharpIcon />
                            </IconButton>
                          </div>
                        </TableCell>
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
