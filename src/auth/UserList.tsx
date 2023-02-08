import { useNavigate } from 'react-router-dom';
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';
import EditIcon from '@mui/icons-material/Edit';
import useAxios from '../hooks/useAxios';
import IndexEntity from '../components/Entities/IndexEntity';
import Header from '../components/UI/Header';
import { urlAccounts } from '../endpoints';
import { userDTO, userRoleDTO } from './auth.model';
import { showErrorToast, showSuccessToast } from '../utils/notificationToast';
import useToggle from '../hooks/useToggle';
import { AxiosError } from 'axios';

export default function UserList() {
  const navigate = useNavigate();
  const axiosPrivate = useAxios();
  const { isOpen, toggle } = useToggle();

  async function changeRole(userRole: userRoleDTO) {
    if (userRole.role !== '')
      try {
        const response = await axiosPrivate.post(`${urlAccounts}/role`, userRole);
        showSuccessToast(`${response.data}`);
      } catch (error) {
        const axiosError = error as AxiosError;
        showErrorToast(axiosError.message);
      }
  }

  async function deleteUser(id: string) {
    try {
      const response = await axiosPrivate.delete(`${urlAccounts}/${id}`);
      showSuccessToast(`${response.data}`);
    } catch (error) {
      const axiosError = error as AxiosError;
      showErrorToast(axiosError.message);
    }
  }
  return (
    <>
      <Box className="bg-white p-3 mt-1 mx-2 rounded">
        <Header
          title="Список Пользователей"
          buttonText="Cоздать пользователя"
          buttonLink="/register"
        />
        <IndexEntity<userDTO> urlEntity={`${urlAccounts}/users`} filterIsEnabled={false}>
          {(users) => (
            <>
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
                        Права
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
                          <div className="d-flex gap-1 align-items-center">
                            {user.roles.map((role, indx) => (
                              <div
                                key={indx}
                                className="d-flex p-1 align-items-center bg-light
                            rounded">
                                <div className="mx-3">{role}</div>
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell align="left">
                          <div className="align-self-center">
                            <IconButton color="success" onClick={() => navigate(`edit/${user.id}`)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton color="error" onClick={() => deleteUser(user.id)}>
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
