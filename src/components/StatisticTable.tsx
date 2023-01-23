import { DataGrid, GridColumns, ruRU } from '@mui/x-data-grid';
import { InputData } from '../data/types';
import formatDataToGridRows from '../utils/formatDataToGridRows';

const columns: GridColumns = [
  { field: 'indx', headerName: '№', maxWidth: 50 },
  { field: 'title', headerName: 'Дисциплина', flex: 1, minWidth: 200, maxWidth: 400 },
  { field: '2', headerName: '2', flex: 1 },
  { field: '3', headerName: '3', flex: 1 },
  { field: '4', headerName: '4', flex: 1 },
  { field: '5', headerName: '5', flex: 1 },
  { field: 'Н', headerName: 'Н/А', flex: 1 }
];

export default function StatisticTable({ rows }: StatisticTableProps) {
  return (
    <>
      <DataGrid
        autoHeight
        localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
        rows={formatDataToGridRows(rows)}
        columns={columns}
        editMode="row"
        disableColumnMenu
      />
    </>
  );
}
interface StatisticTableProps {
  rows: InputData[];
}
