import AutocompleteField from '../components/UI/AutocompleteField';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField, Typography } from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import { Formik } from 'formik';

export default function DiscplinesList() {
  const specialities = ['Русский язык', 'Математика', 'Информатика', 'Физика'];

  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Typography variant="h3" color="primary.main" className="mb-3 rounded  ">
          Дисциплины
        </Typography>
        <Formik initialValues={{ speciality: '1' }} onSubmit={(e) => console.log(e)}>
          <form className="my-3">
            <div className="d-flex justify-content-between">
              <TextField
                id="filled-basic"
                label="Добавить специальность"
                variant="filled"
                className="col-9"
              />
              <Button className="col-2 me-5" variant="contained">
                Добавить
              </Button>
            </div>
          </form>
        </Formik>
        <h3 className="text-left my-3 ">Список дисциплин</h3>

        <ul className="list-group">
          {specialities.map((elem, index) => {
            return (
              <li key={index} className="list-group-item d-flex justify-content-between">
                {elem}
                <Button className="btn " color="warning">
                  <DeleteForeverSharpIcon className="fs-5 " />
                </Button>
              </li>
            );
          })}
        </ul>
      </Box>
    </>
  );
}
