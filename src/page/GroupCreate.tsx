import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../components/Form/GroupForm';
import Header from '../components/UI/Header';
import { urlGroups } from '../endpoints';
import useAxios from '../hooks/useAxios';
import { GroupCreationDTO } from '../data/types';
import { showAxiosErrorToast } from '../utils/notificationToast';

export default function GroupCreate() {
  const navigate = useNavigate();
  const axiosPrivate = useAxios();
  async function create(group: GroupCreationDTO) {
    try {
      await axiosPrivate.post(urlGroups, group);
      navigate('/groups');
    } catch (error) {
      showAxiosErrorToast(error);
    }
  }
  return (
    <>
      <Header title=" Создать группу" />
      <Box className="box-main">
        <GroupForm model={{ name: '', year: '' }} onSubmit={(values) => create(values)} />
      </Box>
    </>
  );
}
