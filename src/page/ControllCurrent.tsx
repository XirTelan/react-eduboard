import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function ControllCurrent() {
  return (
    <>
      <Header title=" Текущий контроль" />
      <BaseControll
        period='monthly'
        type={1}
       
      />
    </>
  );
}
