import Groups from '@mui/icons-material/Groups';
import { Box, Button, TextField, Typography } from '@mui/material';
import { group } from 'console';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AutocompleteField from '../components/UI/AutocompleteField';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { groupDTO, StudentDTO } from '../types';
import { useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { urlGroups } from '../endpoints';

const students: StudentDTO[] = [
  { id: 1, name: '123' },
  { id: 2, name: 'Lex' }
];
const students2: StudentDTO[] = [
  { id: 1, name: 'Petrov' },
  { id: 2, name: 'Ivanod' }
];
const students3: StudentDTO[] = [
  { id: 1, name: 'Oleg' },
  { id: 2, name: 'Max' }
];
const students4: StudentDTO[] = [
  { id: 1, name: 'Stanislav' },
  { id: 2, name: 'Stive' }
];
const students5: StudentDTO[] = [
  { id: 1, name: 'Igor' },
  { id: 2, name: 'Anton' }
];

const groupsData: groupDTO[] = [
  { id: 1, name: 'АА-142d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
  { id: 2, name: 'АБ-76d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students2 },
  { id: 3, name: 'АЧ-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students3 },
  { id: 4, name: 'АО-53d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students4 },
  { id: 5, name: 'АО-а3d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students5 },
  { id: 6, name: 'БО-33d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students2 },
  { id: 7, name: 'БО-43d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students4 },
  { id: 8, name: 'БО-53d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students3 },
  { id: 9, name: 'БО-63d', speciality: '01315631 asdafaljb vzx;kjhbfa', students: students5 }
];

export default function GroupList() {
  const [groups, setGroups] = useState(groupsData);
  const [seacrhString, setSearchString] = useState('');
  function findGroup(search: string) {
    setGroups(groupsData.filter((group) => group.name.includes(search)));
  }
  async function deleteGroup(id: number) {
    try {
      await axios.delete(`${urlGroups}/${id}`);
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }

  function fetchData() {
    axios
      .get(urlGroups)
      .then((response: AxiosResponse<groupDTO[]>) => {
        setGroups(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
            findGroup(e.target.value);
          }}
        />
      </Box>
      <Box className="bg-white p-3 mx-2 rounded" sx={{ maxHeight: '89vh', overflow: 'auto' }}>
        <ul className="p-0">
          {groups.map((group) => {
            return (
              <CollapseListItem
                id={group.id}
                key={group.id}
                displayName={group.name}
                onDelete={deleteGroup}
                items={group.students}>
                <div className="d-flex flex-column m-3 gap-2">
                  <Typography
                    sx={{
                      width: '100%'
                    }}
                    variant="subtitle1">
                    {group.speciality}
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
        </ul>
      </Box>
    </>
  );
}
