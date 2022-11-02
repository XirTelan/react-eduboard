import { useParams, useSearchParams } from 'react-router-dom';
import { DataGrid, GridColDef, GridRowsProp, GridToolbar, GridToolbarColumnsButton, GridToolbarContainer, GridToolbarDensitySelector, GridToolbarFilterButton, ruRU } from '@mui/x-data-grid';
import Filter from './Filter';
import { Button } from '@mui/material';

interface ControllerProps {
  name: string;
}
const rows: GridRowsProp = [
  { id: 1, indx: 1, fio: 'Ivanonv Ivan Ivanovich', col2: 'World' },
  { id: 2, indx: 2, fio: 'Ivanonv Ivan Ivanovich', col2: 'is Awesome' },
  { id: 3, indx: 3, fio: 'Ivanonv Ivan Ivanovich', col2: 'is Amazing' }
];

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
  console.log(nameController);
  return (
    <>
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
    </>
  );
}
