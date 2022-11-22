import { useParams, useSearchParams } from 'react-router-dom';
import {
  DataGrid,
  GridColDef,
  GridRowsProp,
  GridToolbar,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  ruRU
} from '@mui/x-data-grid';
import Filter from '../Filter';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlStudents } from '../../endpoints';
import { studentDTO } from '../../types';

interface ControllerProps {
  name: string;
}

const columns: GridColDef[] = [
  { field: 'indx', headerName: '№', flex: 1 },
  { field: 'fio', headerName: 'ФИО', flex: 1 }
];
interface GenControllProps {
  disc: string[];
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

export default function BaseControll(props: GenControllProps) {
  const [students, setStudents] = useState<studentDTO[]>([]);

  useEffect(() => {
    axios.get(urlStudents).then((resolve) => setStudents(resolve.data));
  }, []);
  const rows: GridRowsProp = students.map((student, indx) => ({
    id: student.id,
    indx: indx + 1,
    fio: `${student.secondName} ${student.firstName} ${student.middleName}`
  }));
  const nameController = useParams();
  const defaulColumns: GridColDef[] = [
    { field: 'indx', headerName: '№', flex: 1, maxWidth: 50 },
    { field: 'fio', headerName: 'ФИО', flex: 1 }
  ];
  const discColumns: GridColDef[] = props.disc.map((elem, index) => ({
    field: `disc${index}`,
    headerName: elem,
    editable: true
  }));
  const columns: GridColDef[] = [...defaulColumns, ...discColumns];
  const data = ['Спец 1', 'Spec 2', 'Spec 3', 'Spec 4', 'Spec 5'];
  const dataUser = [
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I',
    'Ivanov I.I'
  ];
  return (
    <Box className="bg-white p-3  mx-2 rounded">
      <h2 className="d-flex justify-content-center">{nameController.name}</h2>
      <div className="mb-2">
        <DataGrid
          components={{
            Toolbar: CustomToolbar
          }}
          autoHeight
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
          hideFooterSelectedRowCount
        />
      </div>
      <div>
        <Button color="success" variant="contained">
          Сохранить
        </Button>
      </div>
    </Box>
  );
}
