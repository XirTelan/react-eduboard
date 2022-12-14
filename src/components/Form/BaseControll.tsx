import { useParams, useSearchParams } from 'react-router-dom';
import {
  DataGrid,
  GridColDef,
  GridColumns,
  GridEditRowsModel,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowParams,
  GridRowsProp,
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarDensitySelector,
  MuiEvent,
  ruRU
} from '@mui/x-data-grid';
import { Box, Button, CircularProgress } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { urlControll, urlDisciplines, urlSpecialities, urlStudents } from '../../endpoints';
import { disciplineDTO, studentDTO } from '../../types';
import Filter from '../Filter';

interface ControllerProps {
  name: string;
}

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarDensitySelector />
    </GridToolbarContainer>
  );
}

const columnsDefault: GridColumns = [
  { field: 'indx', headerName: '№', maxWidth: 50 },
  { field: 'fio', headerName: 'ФИО', flex: 1, minWidth: 200, maxWidth: 400 }
];
function formatData(data: inputData[]) {
  return data.map((elem) => {
    const newElem: { [k: string]: any } = {
      id: elem.studentId,
      indx: elem.studentId,
      fio: elem.studentFio
    };
    elem.disciplines?.forEach((element) => {
      newElem[`${element.id}`] = element.value;
    });
    return newElem;
  });
}

export default function BaseControll(props: GenControllProps) {
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [columns, setColumns] = useState<GridColumns>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [selectedYear, setSelectedYear] = useState<string>('0000');
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [selectedGroupId, setSelectedGroupId] = useState<number>(0);

  useEffect(() => {
    console.log('Fire useEffect');
    if (selectedGroupId && selectedGroupId != 0) {
      setRows([]);
      getGridColumns();
      loadData(props.type, selectedGroupId, selectedYear, selectedMonth);
    }
  }, [selectedGroupId, selectedYear, selectedMonth]);

  async function getGridColumns() {
    const response = await getGroupDisciplines(selectedGroupId);
    if (!response) return;
    const discColumn: GridColumns = response.data.map((elem: disciplineDTO) => ({
      field: `${elem.id}`,
      headerName: elem.name,
      width: 20,
      sortable: false,
      editable: true,
      flex: 1
    }));
    console.log('asd', discColumn);
    setColumns([...columnsDefault, ...discColumn]);
    console.log(columns);
  }

  async function loadData(typeId: number, groupId: number, year: string, month: number) {
    try {
      const response = await axios.get(urlControll, {
        params: { typeId, groupId, year, month }
      });
      console.log('Data response', response);

      const data = formatData(response.data);
      console.log('Data', data);
      setRows(data);
    } catch (error) {
      console.log(error);
    }
    try {
      console.log('Loading data controll');
    } catch (error) {
      console.log(error);
    }
  }
  // serviceStudents.getStudents()

  async function getGroupDisciplines(groupId: number) {
    try {
      const responce = await axios.get(`${urlDisciplines}/group/${groupId}`);
      console.log('Loading specialitites', responce.data);
      return responce;
    } catch (error) {
      console.log(error);
    }
  }

  function updateParams(groupId: number, year: string, month: number) {
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedGroupId(groupId);
  }

  const processRowUpdate = (newRow: GridRowModel) => {
    setRows(rows.map((row) => (row.id === newRow.id ? newRow : row)));
    return newRow;
  };

  return (
    <>
      <Filter isYearSelectable period={props.period} onSubmit={updateParams} />

      <Box className="bg-white p-3  mx-2 rounded">
        <div className="mb-2 d-flex flex-column justify-content-center">
          {!selectedGroupId || selectedGroupId === 0 ? (
            <p className="fw-bold text-secondary">Группа не выбрана</p>
          ) : rows.length ? (
            <>
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
              <div>
                <Button color="success" variant="contained" onClick={() => console.log(rows)}>
                  Сохранить
                </Button>
              </div>
            </>
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
interface inputData {
  studentId: number;
  studentFio: string;
  disciplines: { id: number; value: string }[];
}
