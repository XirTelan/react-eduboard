import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function ControllEntrance() {
  return (
    <>
      <Header title="Входной контроль" />
      <BaseControll
        type={4}
        period="none"
      
      />
    </>
  );
}
