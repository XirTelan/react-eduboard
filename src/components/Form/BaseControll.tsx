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
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';
import { Box, Button, CircularProgress, IconButton, Switch } from '@mui/material';
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
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';

interface ControllerProps {
  name: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );
}

const columnsDefault: GridColumns = [
  { field: 'indx', headerName: '№', maxWidth: 50 },
  {
    field: 'title',
    headerName: 'ФИО',
    flex: 1,
    minWidth: 200,
    maxWidth: 400,
    cellClassName: 'column-sticky',
    headerClassName: 'column-sticky'
  }
];

export default function BaseControll(props: GenControllProps) {
  const { typeId, month, year, groupId } = props;

  const [rows, setRows] = useState<GridRowsProp>([]);
  const axiosPrivate = useAxios();
  const [isFullView, setIsFullView] = useState(false);
  const changedRows = [];
  const [dataLoaded, setDataLoaded] = useState(false);
  const [isMainView, setIsMainView] = useState<boolean>(true);
  const [statisticRows, setStatisticRows] = useState<inputData[]>([]);
  const [columns, setColumns] = useState<GridColumns>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});

  useEffect(() => {
    if (groupId && groupId != 0) {
      setRows([]);
      getGridColumns();
      updateData(typeId, groupId, year, month);
    }
  }, [groupId, year, month]);

  function updateData(typeId: number, groupId: number, year: string, month: number) {
    loadData(typeId, groupId, year, month);
    loadStatisticData(typeId, groupId, year, month);
  }
  async function getGridColumns() {
    const response = await getGroupDisciplines(groupId);
    if (!response) return;
    const discColumn: GridColumns = response.data.map((elem: disciplineDTO) => ({
      field: `${elem.id}`,
      headerName: elem.name,
      flex: 1,
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

  async function saveGridDataChanges() {
    swalLoading();
    const result = formatGridRowsToData(typeId, month, year, rows);
    if (result === undefined || result.length === 0) return;
    const formatData = result;
    try {
      const response = await axiosPrivate.post(urlControll, formatData);
      Swal.close();
      displaySuccessToast();
    } catch (error) {
      displayErrorToast(error);
    }
    updateData(typeId, groupId, year, month);
  }
  const processRowUpdate = (newRow: GridRowModel) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  return (
    <>
      <Box className="bg-white p-3  mx-2 rounded">
        <div className="mb-2 d-flex flex-column justify-content-center text-center">
          {!groupId || groupId === 0 ? (
            <p className="fw-bold text-secondary">Группа не выбрана</p>
          ) : dataLoaded ? (
            <div
              className={`${
                isFullView
                  ? 'position-absolute top-0 start-0 z-10 end-0 bottom-0 bg-white p-3 overflow-auto ms-1'
                  : ''
              }`}>
              <div className="d-flex justify-content-between mb-3">
                <div>
                  <Switch defaultChecked onChange={() => setIsMainView((prevVal) => !prevVal)} />
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setIsFullView((prev) => !prev)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end">
                    {isFullView ? <FullscreenExitIcon /> : <FullscreenIcon />}
                  </IconButton>
                </div>
                <Button
                  color="success"
                  variant="contained"
                  onClick={() => {
                    saveGridDataChanges();
                  }}>
                  Сохранить
                </Button>
              </div>
              <div id="mainDataGrid">
                {isMainView ? (
                  <DataGrid
                    components={{
                      Toolbar: CustomToolbar
                    }}
                    rowHeight={25}
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
  typeId: number;
  groupId: number;
  month: number;
  year: string;
}
