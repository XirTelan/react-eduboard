import { Box, Typography } from '@mui/material';
import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';

export default function IntermediateControll() {
  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Typography variant="h4" color="primary.main">
        Промежуточная аттестация
      </Typography>
      <Filter isYearSelectable periodicity="half" />
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
