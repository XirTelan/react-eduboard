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
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { urlStudents } from '../../endpoints';
import { studentDTO } from '../../types';
import Filter from '../Filter';

interface ControllerProps {
  name: string;
}

const columns: GridColDef[] = [
  { field: 'indx', headerName: '№', flex: 1 },
  { field: 'fio', headerName: 'ФИО', flex: 1 }
];

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

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

  function updateParams(groupId: number, year: string, month: number) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedGroupId(groupId);
  }
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

  return (
    <>
      <Filter isYearSelectable period={props.period} onSubmit={updateParams} />

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
    </>
  );
}

interface GenControllProps {
  disc: string[];
  period: 'none' | 'half' | 'monthly';
}
