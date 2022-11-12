import { Box, List, MenuItem } from '@mui/material';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';
import { students } from '../data/data';

export default function StudentsList() {
  return (
    <Box>
      <Header title="Список студентов" />
      {/* <Filter periodicity="none" /> */}
      <List>
        {students.map((student) => {
          return <li key={student.id}>{student.name}</li>;
        })}
      </List>
    </Box>
  );
}
