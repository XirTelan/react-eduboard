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
import { customAlert } from '../utils';

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
      <Box className="bg-white p-3 mx-2 mb-1 rounded">
        <Formik
          initialValues={initialValues}
          onSubmit={(val) => {
            console.log(val);
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
      <IndexEntity<disciplineDTO> urlEntity={urlDisciplines}>
        {(disciplines, deleteEntity) => (
          <>
            {disciplines.map((elem, index) => {
              return (
                <li key={elem.id} className="list-group-item d-flex justify-content-between">
                  {elem.name}
                  <Button
                    onClick={() =>
                      customAlert(`Удалить ${elem.name}?`, 'Удалить', () => deleteEntity(elem.id))
                    }
                    className="btn "
                    color="warning">
                    <DeleteForeverSharpIcon className="fs-5 " />
                  </Button>
                </li>
              );
            })}
          </>
        )}
      </IndexEntity>

      <ul className="list-group"></ul>
    </>
  );
}
