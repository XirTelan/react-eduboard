import { useParams, useSearchParams } from 'react-router-dom';
import {
  DataGrid,
  GridColumns,
  GridEditRowsModel,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  MuiEvent,
  ruRU
} from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { urlStudents } from '../../endpoints';
import { studentDTO } from '../../types';
import Filter from '../Filter';

interface ControllerProps {
  name: string;
}

// function CustomToolbar() {
//   return (
//     <GridToolbarContainer>
//       <GridToolbarColumnsButton />
//       <GridToolbarDensitySelector />
//     </GridToolbarContainer>
//   );
// }

export default function BaseControll(props: GenControllProps) {
  const [students, setStudents] = useState<studentDTO[]>([]);
  const [gridData, setGridData] = useState<GridRowsProp>([]);
  const [selectedYear, setSelectedYear] = useState<string>('0000');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);

  useEffect(() => {
    console.log('Fire useEffect');
    if (selectedGroupId && selectedGroupId != 0) {
      setGridData([]);
      loadData(selectedGroupId, selectedYear, selectedMonth);
    }
  }, [selectedGroupId, selectedYear, selectedMonth]);

  async function loadData(groupId: number, year: string, month: number) {
    try {
      console.log('Loading data');
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    axios.get(urlStudents).then((resolve) => setStudents(resolve.data));
  }, []);
  const initialRows: GridRowsProp = [
    {
      id: 1,
      name: 'asdasd',
      age: 25,
      editable: true
    },
    {
      id: 2,
      name: 'asdasd',
      age: 36,
      editable: true
    },
    {
      id: 3,
      name: 'asdasd',
      age: 19,
      editable: true
    },
    {
      id: 4,
      name: 'asdasd',
      age: 28,
      editable: true
    },
    {
      id: 5,
      name: 'asdasd',
      age: 23,
      editable: true
    }
  ];

  function updateParams(groupId: number, year: string, month: number) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedGroupId(groupId);
  }

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  const columns: GridColumns = [
    { field: 'name', headerName: 'Name', width: 180, editable: true },
    { field: 'age', headerName: 'Age', type: 'number', editable: true }
  ];

  const processRowUpdate = (newRow: GridRowModel) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  return (
    <>
      <Filter isYearSelectable period={props.period} onSubmit={updateParams} />

      <Box className="bg-white p-3  mx-2 rounded">
        <div className="mb-2">
          <DataGrid
            autoHeight
            rows={rows}
            columns={columns}
            editMode="row"
            rowModesModel={rowModesModel}
            onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
            processRowUpdate={processRowUpdate}
            experimentalFeatures={{ newEditingApi: true }}
          />
        </div>
        <div>
          <Button color="success" variant="contained" onClick={() => console.log(rows)}>
            Сохранить
          </Button>
        </div>
      </Box>
    </>
  );
}

interface GenControllProps {
  disc: string[];
  period: 'none' | 'half' | 'monthly';
}
