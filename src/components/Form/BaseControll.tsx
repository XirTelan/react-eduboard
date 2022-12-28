import { useParams, useSearchParams } from 'react-router-dom';
import {
  DataGrid,
  GridColumns,
  GridRowModel,
  GridRowModesModel,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
  ruRU
} from '@mui/x-data-grid';
import { Box, Button, CircularProgress, Switch } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { urlControll, urlDisciplines, urlSpecialities, urlStudents } from '../../endpoints';
import { controllRecordCreationDTO, disciplineDTO, inputData, studentDTO } from '../../types';
import Filter from '../Filter';
import formatDataToGridRows, { formatGridRowsToData } from '../../utils/formatDataToGridRows';
import StatisticTable from '../StatisticTable';
import { displayErrorToast, displaySuccessToast, swalLoading, Toast } from '../../utils/swalToast';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';

interface ControllerProps {
  name: string;
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

const columnsDefault: GridColumns = [
  { field: 'indx', headerName: '№', maxWidth: 50 },
  { field: 'title', headerName: 'ФИО', flex: 1, minWidth: 200, maxWidth: 400 }
];
const columnsSticky: GridColumns = [
  { field: 'indx', headerName: '№', maxWidth: 50 },
  { field: 'title', headerName: 'ФИО', flex: 1, minWidth: 200, maxWidth: 400 }
];

export default function BaseControll(props: GenControllProps) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const axiosPrivate = useAxios();
  const changedRows = [];
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isMainView, setIsMainView] = useState<boolean>(true);
  const [statisticRows, setStatisticRows] = useState<inputData[]>([]);
  const [columns, setColumns] = useState<GridColumns>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [selectedYear, setSelectedYear] = useState<string>('0000');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);

  useEffect(() => {
    if (selectedGroupId && selectedGroupId != 0) {
      setRows([]);
      getGridColumns();
      updateData(props.type, selectedGroupId, selectedYear, selectedMonth);
    }
  }, [selectedGroupId, selectedYear, selectedMonth]);

  function updateData(typeId: number, groupId: number, year: string, month: number) {
    loadData(typeId, groupId, year, month);
    loadStatisticData(typeId, groupId, year, month);
  }
  async function getGridColumns() {
    const response = await getGroupDisciplines(selectedGroupId);
    if (!response) return;
    const discColumn: GridColumns = response.data.map((elem: disciplineDTO) => ({
      field: `${elem.id}`,
      headerName: elem.name,
      width: 550,
      sortable: false,
      editable: true
    }));
    setColumns([...columnsDefault, ...discColumn]);
  }

  async function loadData(typeId: number, groupId: number, year: string, month: number) {
    try {
      const response = await axiosPrivate.get(urlControll, {
        params: { typeId, groupId, year, month }
      });
      const data = formatDataToGridRows(response.data);
      setRows(data);
      setDataLoaded(true);
    } catch (error) {
      displayErrorToast(error);
    }
  }
  async function loadStatisticData(typeId: number, groupId: number, year: string, month: number) {
    try {
      const response = await axiosPrivate.get(`${urlControll}/statistic`, {
        params: { typeId, groupId, year, month }
      });
      setStatisticRows(response.data);
    } catch (error) {
      displayErrorToast(error);
    }
  }

  async function getGroupDisciplines(groupId: number) {
    try {
      const responce = await axiosPrivate.get(`${urlDisciplines}/group/${groupId}`);
      return responce;
    } catch (error) {
      displayErrorToast(error);
    }
  }

  function updateParams(groupId: number, year: string, month: number) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedGroupId(groupId);
  }

  async function saveGridDataChanges() {
    swalLoading();
    const result = formatGridRowsToData(props.type, selectedMonth, selectedYear, rows);
    if (result === undefined || result.length === 0) return;
    const formatData = result;
    try {
      const response = await axios.post(urlControll, formatData);
      displaySuccessToast();
    } catch (error) {
      displayErrorToast(error);
    }
    Swal.close();
    updateData(props.type, selectedGroupId, selectedYear, selectedMonth);
  }
  const processRowUpdate = (newRow: GridRowModel) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  return (
    <>
      <Filter isYearSelectable period={props.period} onSubmit={updateParams} />

      <Box className="bg-white p-3  mx-2 rounded">
        <div className="mb-2 d-flex flex-column justify-content-center text-center">
          {!selectedGroupId || selectedGroupId === 0 ? (
            <p className="fw-bold text-secondary">Группа не выбрана</p>
          ) : dataLoaded ? (
            <div>
              <div className="d-flex justify-content-between mb-3">
                <Switch defaultChecked onChange={() => setIsMainView((prevVal) => !prevVal)} />
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    saveGridDataChanges();
                  }}>
                  Сохранить
                </Button>
              </div>
              <div className="position-relative">
                <div id="mainDataGrid">
                  {isMainView ? (
                    <DataGrid
                      components={{
                        Toolbar: CustomToolbar
                      }}
                      autoHeight
                      localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                      rows={rows}
                      columns={columns}
                      editMode="row"
                      rowModesModel={rowModesModel}
                      onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
                      processRowUpdate={processRowUpdate}
                      experimentalFeatures={{ newEditingApi: true }}
                      disableColumnMenu
                    />
                  ) : (
                    statisticRows &&
                    statisticRows.length > 0 && <StatisticTable rows={statisticRows} />
                  )}
                </div>
                <div className="position-absolute">
                  <ul>
                    {/* {rows.forEach(row, (indx) => (
                      <li key={indx}>row</li>
                    ))} */}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <CircularProgress />
          )}
        </div>
      </Box>
    </>
  );
}

interface GenControllProps {
  type: number;
  period: 'none' | 'half' | 'monthly';
}
