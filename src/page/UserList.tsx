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
  TableHead,
  TableRow,
  Typography
} from '@mui/material';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

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
        <Typography sx={{ fontWeight: 'bold' }} variant="h4" color="primary.main">
          Список Пользователей
        </Typography>
        <Button href="/users/create" className="my-3" variant="contained" size="large">
          Создать пользователя
        </Button>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell width="50px" align="center">
                  №
                </TableCell>
                <TableCell variant="head" align="center">
                  Login
                </TableCell>
                <TableCell align="left">FIO</TableCell>
                <TableCell align="center">Роль</TableCell>
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
                    <Select  sx={{width: 200}} value={row.role}>
                      <MenuItem value={1}><span className='fw-700'>ADMIN</span></MenuItem>
                      <MenuItem value={2}>Куратор</MenuItem>
                      <MenuItem value={3}>Пользователь</MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
