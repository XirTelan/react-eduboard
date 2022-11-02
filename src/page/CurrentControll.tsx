import { Box, Typography } from '@mui/material';
import BaseControll from '../components/BaseControll';
import Filter from '../components/Filter';

export default function CurrentControll() {
  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Typography variant="h4" color="primary.main">
        Текущий контроль
      </Typography>
      <Filter isYearSelectable periodicity="monthly" />
      <BaseControll
        disc={[
          'Русский язык',
          'Математика',
          'Информатика',
          'Физика',
          'Английский',
          'Астрономия',
          'Программирование',
          'Программирование',
          'Программирование',
          'Программирование',
          'Программирование',
          'Электротехника'
        ]}
      />
    </Box>
  );
}
