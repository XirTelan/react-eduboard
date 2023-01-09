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
import { Formik } from 'formik';
import Header from '../components/UI/Header';
import IndexEntity from '../components/Entities/IndexEntity';
import { urlDisciplines } from '../endpoints';
import { disciplineCreationDTO, disciplineDTO } from '../types';
import { useNavigate } from 'react-router-dom';
import { displayErrorToast, displaySuccessToast, Toast } from '../utils/swalToast';
import { useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { customAlert } from '../utils';
import useAxios from '../hooks/useAxios';

export default function DiscplinesList() {
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const axiosPrivate = useAxios();

  const initialValues: disciplineCreationDTO = {
    name: ''
  };

  async function create(discipline: disciplineCreationDTO) {
    setUpdate(true);
    try {
      const response = await axiosPrivate.post(`${urlDisciplines}`, discipline);
      displaySuccessToast();
    } catch (error) {
      console.log('disc error', error);
      displayErrorToast(error);
    }
    setUpdate(false);
  }

  return (
    <>
      <Header title="Дисциплины" />
      <Box className="box-main mb-1">
        <Formik
          initialValues={initialValues}
          onSubmit={(val) => {
            create(val);
          }}>
          {(formikProps) => (
            <form onSubmit={formikProps.handleSubmit}>
              <div className="d-flex justify-content-center">
                <TextField
                  {...formikProps.getFieldProps('name')}
                  id="filled-basic"
                  label="Добавить дисциплину"
                  variant="standard"
                  className="col-9 flex-grow-1"
                />
                <Button type="submit" color="success" className="col-2 ms-3" variant="contained">
                  Добавить
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Box>
      {update ? (
        <Box className="box-main align-item-center text-center mb-1">
          <CircularProgress />
        </Box>
      ) : (
        <IndexEntity<disciplineDTO> urlEntity={urlDisciplines}>
          {(disciplines, deleteEntity) => (
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
                      <TableCell sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} align="left">
                        Наименование
                      </TableCell>
                      <TableCell sx={{ fontWeight: 'bold', fontSize: '1.125rem' }} align="right">
                        Действия
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {disciplines.map((discipline, index) => {
                      return (
                        <TableRow
                          key={discipline.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="left">{index + 1}</TableCell>
                          <TableCell align="left">{discipline.name}</TableCell>
                          <TableCell align="right">
                            <div className="align-self-center">
                              <IconButton
                                color="success"
                                onClick={() => navigate(`edit/${discipline.id}`)}>
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                color="error"
                                onClick={() =>
                                  customAlert(`Удалить ${discipline.name}?`, 'Удалить', () =>
                                    deleteEntity(discipline.id)
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
      )}
    </>
  );
}
