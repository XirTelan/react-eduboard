import Groups from '@mui/icons-material/Groups';
import { Box, Button, Typography } from '@mui/material';
import { group } from 'console';
import AutocompleteField from '../components/UI/AutocompleteField';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import TextField from '../components/UI/TextField';

export default function GroupList() {
  const students: StudentDTO[] = [
    { id: 1, name: 'Иванов иван иванович' },
    { id: 2, name: 'Alex' }
  ];
  const groups: GroupDTO[] = [
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students },
    { id: 1, name: 'ЭО-13d', speciality: '01315631 asdafaljb vzx;kjhbfa', students }
  ];

  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Header title="Группы" buttonText="Создать группу" buttonLink="group/create" />

        <ul>
          {groups.map((group, indx) => {
            return (
              <CollapseListItem
                key={indx}
                name={group.name}
                items={group.students.map((elem) => {
                  return elem.name;
                })}>
                <div className='d-flex flex-column m-3 gap-2'>
                  <Typography
                    sx={{
                      width: '100%',
                    }}
                    className="shadow-sm"
                    variant="body1">
                    {group.speciality}
                  </Typography>
                  <Typography
                    sx={{
                      width: '100%',
                      backgroundColor: 'primary.main',
                      color: 'common.white',
                    }}
                    variant="h5">
                    Куратор:
                  </Typography>
                  <Typography
                    sx={{
                      width: '100%',
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
interface StudentDTO {
  id: number;
  name: string;
}
interface GroupDTO {
  id: number;
  name: string;
  speciality: string;
  students: StudentDTO[];
}
