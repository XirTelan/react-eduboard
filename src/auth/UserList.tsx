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
  TableRow
} from '@mui/material';
import axios from 'axios';
import Swal from 'sweetalert2';
import { userRoleDTO } from './auth.model';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlAccounts } from '../endpoints';
import { userDTO } from '../types';
import Authorized from './Authorized';
import { displayErrorToast } from '../utils/swalToast';
import { useEffect, useState } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAxios from '../hooks/useAxios';

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

export default function UserList() {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxios();
  async function changeRole(userRole: userRoleDTO) {
    if (userRole.role !== '')
      try {
        const response = await axiosPrivate.post(`${urlAccounts}/role`, userRole);
        Swal.fire(`${response.data}`);
      } catch (error) {
        displayErrorToast(error);
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
        <IndexEntity<userDTO> urlEntity={`${urlAccounts}/users`} filterIsEnabled={false}>
          {(users) => (
            <>
              {console.log('User:', users)}
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ width: 200, backgroundColor: 'primary.main' }}>
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
                        sx={{
                          color: 'common.white',
                          fontWeight: 'bold',
                          fontSize: '1.125rem',
                          width: '10%'
                        }}
                        align="center">
                        Роль
                      </TableCell>
                      <TableCell
                        sx={{
                          color: 'common.white',
                          fontWeight: 'bold',
                          fontSize: '1.125rem',
                          width: '10%'
                        }}
                        align="center">
                        Действия
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((user, index) => {
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
                              disabled={user.userName === 'Admin'}
                              value={user.role ? user.role : 'User'}
                              onChange={(e) =>
                                changeRole({ userId: user.id, role: e.target.value.toString() })
                              }>
                              <MenuItem value="Admin">
                                <span className="fw-bold">ADMIN</span>
                              </MenuItem>
                              <MenuItem value="User">
                                <span className="fw-bold">КУРАТОР</span>
                              </MenuItem>
                            </Select>
                          </TableCell>
                          <TableCell align="left">
                            <div></div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </IndexEntity>
      </Box>
    </>
  );
}
