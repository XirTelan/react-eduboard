import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DragDropFile from '../components/DragDropFile';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlStudents } from '../endpoints';
import { StudentDTO } from '../data/types';
import { convertJsonToStudentDTO, excelImport } from '../utils/handleExcel';

import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import useAxios from '../hooks/useAxios';
import { showAlertConfirm, showSuccessToast } from '../utils/notificationToast';

export default function StudentsList() {
  const navigate = useNavigate();
  const axiosPrivate = useAxios();

  async function postStudents(file: File) {
    try {
      const result = await excelImport(file, 'students');
      const students = convertJsonToStudentDTO(result);
      await axiosPrivate.post(`${urlStudents}/excel`, students);
      showSuccessToast(`Добавлено ${students.length} студентов`);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Header title="Список студентов" buttonLink="create" buttonText="Добавить студента">
        <DragDropFile title="Импорт" handleFiles={postStudents} />
      </Header>

      <IndexEntity<StudentDTO> urlEntity={urlStudents}>
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
                    <TableCell sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} align="left">
                      Группа
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
                        <TableCell align="left"> {student.group.name}</TableCell>
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
                                showAlertConfirm(
                                  `Вы уверены что хотите удалить студента ${student.secondName} ${student.firstName}?`,
                                  student.id,
                                  deleteEntity
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
