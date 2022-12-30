import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Swal from 'sweetalert2';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import EditIcon from '@mui/icons-material/Edit';

import useAxios from '../hooks/useAxios';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlAccounts } from '../endpoints';
import { userDTO } from '../types';
import { displayErrorToast } from '../utils/swalToast';
import { userRoleDTO } from './auth.model';
import { customAlert } from '../utils';

export default function UserList() {
  const navigate = useNavigate();
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

  async function deleteUser(id: string) {
    try {
      const response = await axiosPrivate.delete(`${urlAccounts}/${id}`);
      Swal.fire(`${response.data}`);
    } catch (error) {
      displayErrorToast(error);
    }
  }
  return (
    <>
      <Box className="bg-white p-3 mt-1 mx-2 rounded">
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
                    {users.map((user, index) => (
                      <TableRow
                        key={user.id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell align="center">{index + 1}</TableCell>
                        <TableCell component="th" scope="row" align="center">
                          {user.userName}
                        </TableCell>
                        <TableCell align="left"> {user.fio}</TableCell>
                        <TableCell align="center">
                          {user.roles.map((role, indx) => (
                            <p key={indx}>{role}</p>
                          ))}
                          <Select
                            sx={{ width: 200 }}
                            disabled={user.userName === 'Admin'}
                            value={'User'}
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
                          <div className="align-self-center">
                            <IconButton color="success" onClick={() => navigate(`edit/${user.id}`)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              color="error"
                              onClick={() =>
                                customAlert(`Удалить ${user.fio}?`, 'Удалить', () =>
                                  deleteUser(user.id)
                                )
                              }>
                              <DeleteForeverSharpIcon />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
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
