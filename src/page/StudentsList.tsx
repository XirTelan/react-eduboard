import { Box } from '@mui/material';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function StudentsList() {
  return (
    <Box>
      <Header title="Список студентов" />
      {/* <Filter periodicity="none" /> */}
    </Box>
  );
}
