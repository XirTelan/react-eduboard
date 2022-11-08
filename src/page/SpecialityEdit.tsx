import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpecialityForm from '../components/Form/SpecialitytForm';
import { specialities } from '../data/data';
import { specialityDTO } from '../types';

const getSpecialityData = (id: number) => {
  console.log('id in', id);
  console.log(
    'result',
    specialities.find((elem) => elem.id === id)
  );
  return specialities.find((elem) => elem.id === id);
};

export default function SpecialityEdit() {
  const [speciality, setSpeciality] = useState();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      speciality = getSpecialityData(parseInt(id));
      console.log('result get ', speciality);
    }
  }, []);
  console.log(id);
  console.log(speciality);
  console.log(specialities);

  return (
    <>
      {speciality && <h1>asdasfda</h1>}
      {speciality && (
        <SpecialityForm name={speciality?.name} selectedDisciplines={speciality?.items} />
      )}

      <div></div>
    </>
  );
}
