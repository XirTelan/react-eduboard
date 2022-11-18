import { Box, List, ListItem, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Filter from '../components/Filter';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { students } from '../data/data';

export default function StudentsList() {
  const [studentsList, setStudentsList] = useState(students);
  const [seacrhString, setSearchString] = useState('');

  useEffect(() => {
    findStudent(seacrhString);
  }, [seacrhString]);
  function findStudent(search: string) {
    setStudentsList(students.filter((student) => student.name.includes(search)));
  }
  return (
    <>
      <Header title="Список студентов" />
      <Box className="bg-white p-3 mx-2 mb-1 rounded">
        <TextField
          fullWidth
          label="Поиск студента"
          variant="standard"
          value={seacrhString}
          onChange={(e) => {
            setSearchString(e.target.value);
            // findGroup(e.target.value);
          }}
        />
      </Box>
      <Box className="bg-white p-3 mx-2 rounded">
        {/* <Filter periodicity="none" /> */}
        <List>
          {studentsList.map((student) => {
            return <ListItem key={student.id}>{student.name}</ListItem>;
          })}
        </List>
      </Box>
    </>
  );
}
