import { Box, List, ListItem, MenuItem, Typography } from '@mui/material';
import Filter from '../components/Filter';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { students } from '../data/data';

export default function StudentsList() {
  return (
    <>
      <Header title="Список студентов" />
      <Box className="bg-white p-3 mx-2 rounded">
        {/* <Filter periodicity="none" /> */}
        <List>
          {students.map((student) => {
            return <ListItem key={student.id}>{student.name}</ListItem>;
          })}
        </List>
      </Box>
    </>
  );
}
