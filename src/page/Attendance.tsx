import { Box } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowsProp,
  ruRU
} from '@mui/x-data-grid';
import { useState } from 'react';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';
const testObj = [
  {
    studentId: 5,
    studentFio: 'asdd asf af ',
    days: [
      { id: 1, value: 'a' },
      { id: 2, value: 'a' },
      { id: 5, value: 'a' },
      { id: 7, value: 'a' },
      { id: 10, value: 'a' }
    ]
  },
  {
    studentId: 6,
    studentFio: 'ZVZXA asf af ',
    days: [
      { id: 1, value: 'a' },
      { id: 2, value: 'a' },
      { id: 5, value: 'a' },
      { id: 7, value: 'a' },
      { id: 10, value: 'a' }
    ]
  }
];

function formatData(data: inputData[]) {
  return data.map((elem) => {
    const newElem: { [k: string]: any } = {
      id: elem.studentId,
      indx: elem.studentId,
      fio: elem.studentFio
    };
    elem.days.forEach((element) => {
      newElem[`d${element.id}`] = element.value;
    });
    return newElem;
  });
}

const rows: GridRowsProp = formatData(testObj);

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
const onCellEditCommit = (cellData: any) => {
  const { id, field, value } = cellData;
  console.log(cellData);
};
const columnsDefault: GridColDef[] = [
  { field: 'indx', headerName: '№', flex: 1, maxWidth: 50 },
  { field: 'fio', headerName: 'ФИО', flex: 1, minWidth: 100 }
];

export default function Attendance() {
  const [selectedYear, setSelectedYear] = useState();
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
        {}
        <DataGrid
          autoHeight
          experimentalFeatures={{ columnGrouping: true }}
          columnGroupingModel={columnGroupingModel}
          onCellEditCommit={onCellEditCommit}
          localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
          rows={rows}
          columns={columns}
        />
      </Box>
    </>
  );
}

interface inputData {
  studentId: number;
  studentFio: string;
  days: { id: number; value: string }[];
}
