import { Box, Typography } from '@mui/material';
import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function CurrentControll() {
  return (
    <>
      <Header title=" Текущий контроль" />
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
    </>
  );
}
