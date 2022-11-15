import { Box, Typography } from '@mui/material';
import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function IntermediateControll() {
  return (
    <>
      <Header title="Промежуточная аттестация" />
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
    </>
  );
}
