import { Box, Typography } from '@mui/material';
import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function IntersessionalControll() {
  return (
    <>
      <Header title=" Межсессионный контроль" />
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
