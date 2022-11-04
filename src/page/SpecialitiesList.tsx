import { Box, Button, Typography } from '@mui/material';

import CollapseListItem from '../components/UI/CollapseListItem';

export default function SpecialitiesList() {
  const specialities2 = ['Русский язык', 'Математика', 'Английский', 'Физика', 'Электротехника'];
  const specialities = ['Русский язык', 'Математика', 'Информатика', 'Физика'];
  const specialities3 = [
    'Русский язык',
    'Математика',
    'Информатика',
    'Физика',
    'Английский',
    'Физика',
    'Электротехника'
  ];

  return (
    <Box
      maxHeight="89vh"
      sx={{ overflow: 'hidden', overflowY: 'auto' }}
      className="bg-white m-3 p-3 rounded">
      <Typography variant="h4" color="primary.main">
        Специальности
      </Typography>
      <Button href="specialities/create" className="my-3" variant="contained" size="large">
        Создать специальность
      </Button>
      <ul className="list-group">
        <CollapseListItem
          name="347 Очень длинное название специальности"
          items={specialities}
        />
        <CollapseListItem
          name="0125 Очень длинное название специальности 2"
          items={specialities3}
        />
        <CollapseListItem
          name="1654 Очень длинное название специальности 3"
          items={specialities2}
        />
        <CollapseListItem
          name="274 Очень длинное название специальности 4"
          items={specialities}
        />
        <CollapseListItem
          name="718 Очень длинное название специальности 5"
          items={specialities}
        />
        <CollapseListItem
          name="0125 Очень длинное название специальности 6"
          items={specialities2}
        />
        <CollapseListItem
          name="2754 Очень длинное название специальности 7"
          items={specialities3}
        />
      </ul>
    </Box>
  );
}
