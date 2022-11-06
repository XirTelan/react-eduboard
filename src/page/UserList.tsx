import {
  Box,
  Button,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Header from '../components/UI/Header';

function createData(
  login: string,
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  role: number
) {
  return { login, name, calories, fat, carbs, role };
}

const rows = [
  createData('asdasd', 'Frozen yoghurt', 159, 6.0, 24, 1),
  createData('Gajfa', 'Ice cream sandwich', 237, 9.0, 37, 2),
  createData('Oxaw3', 'Eclair', 262, 16.0, 24, 1),
  createData('Elasdn', 'Cupcake', 305, 3.7, 67, 3),
  createData('asRqxcv', 'Gingerbread', 356, 16.0, 49, 1)
];

export default function UserList() {
  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Header
          title="Список Пользователей"
          buttonText="Cоздать пользователя"
          buttonLink="/users/create"
        />

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow sx={{ width: 200, backgroundColor: 'primary.light' }}>
                <TableCell
                  sx={{ color: 'common.white', fontWeight: 'bold', fontSize: '1.125rem' }}
                  width="50px"
                  align="center">
                  №
                </TableCell>
                <TableCell
                  sx={{ color: 'common.white', fontWeight: 'bold', fontSize: '1.125rem' }}
                  variant="head"
                  align="center">
                  Login
                </TableCell>
                <TableCell
                  sx={{ color: 'common.white', fontWeight: 'bold', fontSize: '1.125rem' }}
                  align="left">
                  FIO
                </TableCell>
                <TableCell
                  sx={{ color: 'common.white', fontWeight: 'bold', fontSize: '1.125rem' }}
                  align="center">
                  Роль
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">{index + 1}</TableCell>
                  <TableCell component="th" scope="row" align="center">
                    {row.login}
                  </TableCell>
                  <TableCell align="left">{row.name}</TableCell>
                  <TableCell align="center">
                    <Select sx={{ width: 200 }} value={row.role}>
                      <MenuItem value={1}>
                        <span className="fw-bold">ADMIN</span>
                      </MenuItem>
                      <MenuItem value={2}>
                        <span className="fw-bold">КУРАТОР</span>
                      </MenuItem>
                      <MenuItem value={3}>
                        <span className="fw-bold">ПОЛЬЗОВАТЕЛЬ</span>
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter sx={{ backgroundColor: 'primary.light' }}>
              <TableRow >
                <TableCell
                  sx={{
                    height: '3rem',
                    color: 'common.white',
                    fontWeight: 'bold',
                    fontSize: '1.125rem'
                  }}
                  colSpan={4}
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
