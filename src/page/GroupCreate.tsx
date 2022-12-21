import { Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GroupForm from '../components/Form/GroupForm';
import Header from '../components/UI/Header';
import { urlGroups, urlSpecialities } from '../endpoints';
import { groupCreationDTO, groupDTO, specialityCreationDTO } from '../types';
import { displayErrorToast } from '../utils/swalToast';

export default function GroupCreate() {
  const navigate = useNavigate();

  async function create(group: groupCreationDTO) {
    try {
      await axios.post(urlGroups, group);
      navigate('/groups');
    } catch (error) {
      displayErrorToast(error);
    }
  }
  return (
    <>
      <Header title=" Создать группу" />
      <Box className="bg-white p-3 mx-2 rounded">
        <GroupForm model={{ name: '', year: '' }} onSubmit={(values) => create(values)} />
      </Box>
    </>
  );
}
