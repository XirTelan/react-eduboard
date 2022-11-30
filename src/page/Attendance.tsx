import {
  Box
} from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowsProp,
  ruRU
} from '@mui/x-data-grid';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

const rows: GridRowsProp = [
  { id: 1, indx: 1, fio: 'Ivanonv Ivan Ivanovich', col2: 'World' },
  { id: 2, indx: 2, fio: 'Ivanonv Ivan Ivanovich', col2: 'is Awesome' },
  { id: 3, indx: 3, fio: 'Ivanonv Ivan Ivanovich', d: 'is Amazing' }
];
const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: 'Дни месяца',
    headerAlign: 'center',
    children: [
      { field: 'd1' },
      { field: 'd2' },
      { field: 'd3' },
      { field: 'd4' },
      { field: 'd5' },
      { field: 'd6' },
      { field: 'd7' },
      { field: 'd8' },
      { field: 'd9' },
      { field: 'd10' },
      { field: 'd11' },
      { field: 'd12' },
      { field: 'd13' },
      { field: 'd14' },
      { field: 'd15' },
      { field: 'd16' },
      { field: 'd17' },
      { field: 'd18' },
      { field: 'd19' },
      { field: 'd20' },
      { field: 'd21' },
      { field: 'd22' },
      { field: 'd23' },
      { field: 'd24' },
      { field: 'd25' },
      { field: 'd26' },
      { field: 'd27' },
      { field: 'd28' },
      { field: 'd29' },
      { field: 'd30' },
      { field: 'd31' }
    ]
  }
];

const columnsDefault: GridColDef[] = [
  { field: 'indx', headerName: '№', flex: 1, maxWidth: 50 },
  { field: 'fio', headerName: 'ФИО', flex: 1, minWidth: 100 }
];

export default function Attendance() {
  const days: string[] = [...Array(31).keys()].map((e) => '' + (e + 1));
  const daysColumn: GridColDef[] = days.map((elem, index) => ({
    field: `d${index + 1}`,
    headerName: elem,
    width: 20,
    editable: true
  }));
  const columns: GridColDef[] = [...columnsDefault, ...daysColumn];
  return (
    <>
      <Header title="Посещяемость" />
      <Filter isYearSelectable periodicity="monthly" />
      <Box className="bg-white p-3 mx-2 rounded">
        <DataGrid
          autoHeight
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
        />
      </Box>
    </>
  );
}
