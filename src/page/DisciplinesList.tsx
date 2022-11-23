import AutocompleteField from '../components/UI/AutocompleteField';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography } from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { Formik } from 'formik';
import Header from '../components/UI/Header';
import IndexEntity from '../components/Entities/IndexEntity';
import { urlDisciplines } from '../endpoints';
import { disciplineCreationDTO, disciplineDTO } from '../types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function DiscplinesList() {
  const navigate = useNavigate();

  const initialValues: disciplineCreationDTO = {
    name: ''
  };

  async function create(discipline: disciplineCreationDTO) {
    console.log('Create');
    try {
      await axios.post(`${urlDisciplines}`, discipline).then((resolve) => {
        Swal.fire('Success', resolve.data);
        navigate('/disciplines');
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Header title="Дисциплины" />
      <Box className="bg-white p-3 mx-2 rounded">
        <Formik
          initialValues={initialValues}
          onSubmit={(val) => {
            console.log(val);
            create(val);
          }}>
          {(formikProps) => (
            <form className="my-3" onSubmit={formikProps.handleSubmit}>
              <div className="d-flex justify-content-center">
                <TextField
                  {...formikProps.getFieldProps('name')}
                  id="filled-basic"
                  label="Добавить дисциплину"
                  variant="filled"
                  className="col-9"
                />
                <Button type="submit" color="success" className="col-2 ms-3" variant="contained">
                  Добавить
                </Button>
              </div>
            </form>
          )}
        </Formik>
        <h3 className="text-left my-3 ">Список дисциплин</h3>
        <IndexEntity<disciplineDTO> urlEntity={urlDisciplines}>
          {(disciplines) => (
            <>
              {disciplines.map((elem, index) => {
                return (
                  <li key={index} className="list-group-item d-flex justify-content-between">
                    {elem.name}
                    <Button className="btn " color="warning">
                      <DeleteForeverSharpIcon className="fs-5 " />
                    </Button>
                  </li>
                );
              })}
            </>
          )}
        </IndexEntity>

        <ul className="list-group"></ul>
      </Box>
    </>
  );
}
