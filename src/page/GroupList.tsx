import { Box, TextField, Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { groupDTO } from '../types';
import { useState } from 'react';
import { urlGroups } from '../endpoints';
import IndexEntity from '../components/Entities/IndexEntity';

export default function GroupList() {
  const [seacrhString, setSearchString] = useState('');

  return (
    <>
      <Header
        title="Группы"
        buttonIcon={<GroupAddIcon />}
        buttonText="Создать группу"
        buttonLink="create"
      />
      <Box className="bg-white p-3 mx-2 mb-1 rounded">
        <TextField
          fullWidth
          label="Поиск группы"
          variant="standard"
          value={seacrhString}
          onChange={(e) => {
            setSearchString(e.target.value);
          }}
        />
      </Box>
      <IndexEntity<groupDTO> urlEntity={urlGroups}>
        {(groups, deleteEntity) => (
          <>
            {console.log(groups)}
            {groups.map((group) => {
              return (
                <CollapseListItem
                  id={group.id}
                  key={group.id}
                  displayName={group.name}
                  onDelete={deleteEntity}
                  items={group.students.map((student) => {
                    return { id: student.id, name: `${student.firstName}` };
                  })}>
                  <div className="d-flex flex-column m-3 gap-2">
                    <Typography
                      sx={{
                        width: '100%'
                      }}
                      variant="subtitle1">
                      {group.speciality.name}
                    </Typography>
                    <Typography
                      sx={{
                        width: '100%'
                      }}
                      variant="h5">
                      Куратор:
                    </Typography>
                    <Typography
                      sx={{
                        width: '100%'
                      }}
                      variant="body1">
                      Фамилия Имя Отчество
                    </Typography>
                    <Typography variant="h5">Список студентов группы:</Typography>
                  </div>
                </CollapseListItem>
              );
            })}
          </>
        )}
      </IndexEntity>
    </>
  );
}
