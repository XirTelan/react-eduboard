import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SpecialityForm from '../components/Form/SpecialitytForm';
import Header from '../components/UI/Header';
import { disciplines, specialities } from '../data/data';
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
  const [speciality, setSpeciality] = useState<specialityDTO>();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      setSpeciality(getSpecialityData(parseInt(id)));
    }
  }, []);

  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Header
        title={
          speciality ? `Редактировать специальность "${speciality.name}"` : 'Добавить специальность'
        }
      />
      {speciality && (
        <SpecialityForm
          model={speciality}
          seletedDisciplined={[]}
          nonSelectedDisciplines={disciplines}
          onSubmit={(values) => console.log(values)}
        />
      )}
    </Box>
  );
}
