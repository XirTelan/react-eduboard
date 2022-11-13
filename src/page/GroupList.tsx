import Groups from '@mui/icons-material/Groups';
import { Box, Button, Typography } from '@mui/material';
import { group } from 'console';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AutocompleteField from '../components/UI/AutocompleteField';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import TextField from '../components/UI/TextField';
import { groupDTO, StudentDTO } from '../types';

export default function GroupList() {
  const students: StudentDTO[] = [
    { id: 1, name: 'Иванов иван иванович' },
    { id: 2, name: 'Alex' }
  ];
  const groups: groupDTO[] = [
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 2, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 3, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 4, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 5, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 6, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 7, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 8, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 9, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students }
  ];

  return (
    <>
      <Box className="bg-white p-3 m-3 rounded" sx={{ maxHeight: '89vh', overflow: 'auto' }}>
        <Header title="Группы" buttonIcon={<GroupAddIcon/>} buttonText="Создать группу" buttonLink="create" />

        <ul>
          {groups.map((group) => {
            return (
              <CollapseListItem key={group.id} displayName={group.name} items={group.students}>
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
