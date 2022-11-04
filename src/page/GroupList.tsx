import Groups from '@mui/icons-material/Groups';
import { Box, Button, Typography } from '@mui/material';
import { group } from 'console';
import AutocompleteField from '../components/UI/AutocompleteField';
import CollapseListItem from '../components/UI/CollapseListItem';
import TextField from '../components/UI/TextField';

export default function GroupList() {
  const students: StudentDTO[] = [
    { id: 1, name: 'Max' },
    { id: 2, name: 'Alex' }
  ];
  const groups: GroupDTO[] = [{ id: 1, name: 'asd', students }];

  return (
    <>
      <Box className="bg-white p-3 m-3 rounded">
        <Typography variant="h4" color="primary.main">
          Группы
        </Typography>
        <Button href="group/create" className="my-3" variant="contained" size="large">
          Создать группу
        </Button>
        <ul className="list-group">
          <CollapseListItem
            name="ЭО-113"
            items={groups[0].students.map((elem) => {
              return elem.name;
            })}>
            <Typography variant="h5">Специальность:</Typography>
            <Typography variant="body1">01321 Раз два Три Четыре</Typography>
            <Typography variant="h5">Куратор:</Typography>
            <Typography variant="body1">Фамилия Имя Отчество</Typography>
            <Typography variant="h5">Список студентов группы:</Typography>
          </CollapseListItem>
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
  students: StudentDTO[];
}
