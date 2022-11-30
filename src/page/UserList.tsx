import {
  Box,
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
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { userRoleDTO } from '../auth/auth.model';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlAccounts } from '../endpoints';
import { userDTO } from '../types';

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
  async function changeRole(userRole: userRoleDTO) {
    if (userRole.role !== '')
      try {
        const response = await axios.post(`${urlAccounts}/role`, userRole);
        Swal.fire(`${response.data}`);
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Header
          title="Список Пользователей"
          buttonText="Cоздать пользователя"
          buttonLink="/users/create"
        />
        <IndexEntity<userDTO> urlEntity={`${urlAccounts}/users`}>
          {(users) => (
            <>
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
                        sx={{ color: 'common.white', fontWeight: 'bold', fontSize: '1.125rem' , width: '10%'}}
                        align="center">
                        Роль
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => {
                      console.log(user);
                      return (
                        <TableRow
                          key={user.id}
                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell align="center">{index + 1}</TableCell>
                          <TableCell component="th" scope="row" align="center">
                            {user.userName}
                          </TableCell>
                          <TableCell align="left"> {user.fio}</TableCell>
                          <TableCell align="center">
                            <Select
                              sx={{ width: 200 }}
                              value={user.role ? user.role : 'user'}
                              onChange={(e) =>
                                changeRole({ userId: user.id, role: e.target.value.toString() })
                              }>
                              <MenuItem value="admin">
                                <span className="fw-bold">ADMIN</span>
                              </MenuItem>
                              <MenuItem value="user">
                                <span className="fw-bold">КУРАТОР</span>
                              </MenuItem>
                            </Select>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter sx={{ backgroundColor: 'primary.light' }}>
                    <TableRow>
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
            </>
          )}
        </IndexEntity>
      </Box>
    </>
  );
}
