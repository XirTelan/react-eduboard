import { Box, CircularProgress } from '@mui/material';
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
  GridRowsProp,
  ruRU
} from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';
import { urlAttendance } from '../endpoints';
import useAxios from '../hooks/useAxios';
import { AttendanceCreationDTO } from '../data/types';
import formatDataToGridRows from '../utils/formatDataToGridRows';
import { showAxiosErrorToast, showSuccessToast } from '../utils/notificationToast';

const columnGroupingModel: GridColumnGroupingModel = [
  {
    groupId: 'Дни месяца',
    headerAlign: 'center',
    children: [
      { field: '1' },
      { field: '2' },
      { field: '3' },
      { field: '4' },
      { field: '5' },
      { field: '6' },
      { field: '7' },
      { field: '8' },
      { field: '9' },
      { field: '10' },
      { field: '11' },
      { field: '12' },
      { field: '13' },
      { field: '14' },
      { field: '15' },
      { field: '16' },
      { field: '17' },
      { field: '18' },
      { field: '19' },
      { field: '20' },
      { field: '21' },
      { field: '22' },
      { field: '23' },
      { field: '24' },
      { field: '25' },
      { field: '26' },
      { field: '27' },
      { field: '28' },
      { field: '29' },
      { field: '30' },
      { field: '31' }
    ]
  }
];

const columnsDefault: GridColDef[] = [
  { field: 'indx', headerName: '№', maxWidth: 50 },
  {
    field: 'title',
    headerName: 'ФИО',
    flex: 1,
    minWidth: 200,
    cellClassName: 'column-sticky',
    headerClassName: 'column-sticky'
  }
];

export default function Attendance() {
  const [gridData, setGridData] = useState<GridRowsProp>([]);
  const [isDirty, setIsDirty] = useState(false);
  const [selectedYear, setSelectedYear] = useState<string>('0000');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);
  const axiosPrivate = useAxios();
  const days: string[] = [...Array(31).keys()].map((e) => '' + (e + 1));
  const daysColumn: GridColDef[] = days.map((elem, index) => ({
    field: `${index + 1}`,
    headerName: elem,
    width: 20,
    editable: true
  }));
  const columns: GridColDef[] = [...columnsDefault, ...daysColumn];

  async function onCellEditCommit(cellData: any) {
    const { id, field, value } = cellData;
    if (value === undefined) return;
    const formatData: AttendanceCreationDTO = {
      StudentId: id,
      Day: field,
      Month: selectedMonth,
      Year: selectedYear,
      Value: value
    };
    try {
      await axiosPrivate.post(urlAttendance, formatData);
      showSuccessToast('Успех');
    } catch (error) {
      setIsDirty(true);
      showAxiosErrorToast(error);
    }
  }

  function updateParams(groupId: number, year: string, month: number) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedGroupId(groupId);
  }
  useEffect(() => {
    async function loadData(groupId: number, year: string, month: number) {
      try {
        const response = await axiosPrivate.get(urlAttendance, {
          params: { groupId, year, month }
        });
        const data = formatDataToGridRows(response.data);
        setGridData(data);
      } catch (error) {
        showAxiosErrorToast(error);
      }
    }

    if (selectedGroupId && selectedGroupId != 0) {
      setGridData([]);
      loadData(selectedGroupId, selectedYear, selectedMonth);
    }
  }, [isDirty, selectedGroupId, selectedYear, selectedMonth]);

  return (
    <>
      <Header title="Посещаемость" />
      <Filter isYearSelectable period="monthly" onSubmit={updateParams} />
      <Box className="box-main">
        <div className="d-flex align-items-center justify-content-center">
          {!selectedGroupId || selectedGroupId === 0 ? (
            <p className="fw-bold text-secondary">Группа не выбрана</p>
          ) : gridData.length ? (
            <DataGrid
              autoHeight
              experimentalFeatures={{ columnGrouping: true }}
              columnGroupingModel={columnGroupingModel}
              onCellEditCommit={onCellEditCommit}
              localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
              rows={gridData}
              columns={columns}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </Box>
    </>
  );
}
