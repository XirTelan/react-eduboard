import { Box, Button, List, ListItem, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import IndexEntity from '../components/Entities/IndexEntity';
import Filter from '../components/Filter';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { urlStudents } from '../endpoints';
import { studentDTO } from '../types';

export default function StudentsList() {
  const [seacrhString, setSearchString] = useState('');

  // useEffect(() => {
  //   findStudent(seacrhString);
  // }, [seacrhString]);
  // function findStudent(search: string) {
  //   setStudentsList(students.filter((student) => student.secondName.includes(search)));
  // }
  return (
    <>
      <Header title="Список студентов" buttonLink="create" buttonText="Добавить студента">
        <Button
          className="me-1"
          onClick={() => console.log('Custom')}
          color="success"
          variant="contained"
          size="large">
          Импорт
        </Button>
      </Header>
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
      <IndexEntity<studentDTO> urlEntity={urlStudents}>
        {(students, deleteEntity) => (
          <>
            {students.map((student) => {
              return (
                <ListItem
                  key={
                    student.id
                  }>{`${student.secondName} ${student.firstName} ${student.middleName}`}</ListItem>
              );
            })}
          </>
        )}
      </IndexEntity>
    </>
  );
}
