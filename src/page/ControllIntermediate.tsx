import BaseControll from '../components/Form/BaseControll';
import Filter from '../components/Filter';
import Header from '../components/UI/Header';

export default function ControllIntermediate() {
  return (
    <>
      <Header title="Промежуточная аттестация" />
      <BaseControll
        period="half"
        type={3}
        
      />
    </>
  );
}
