import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function ControllCurrent() {
  return (
    <>
      <Header title=" Текущий контроль" />
      <BaseControll
        period='monthly'
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
