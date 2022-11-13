import axios, { AxiosResponse } from 'axios';
import { Box, Button, Typography } from '@mui/material';

import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { disciplines, specialities } from '../data/data';
import { disciplineDTO, specialityDTO } from '../types';
import { useEffect } from 'react';
import { urlSpecialities } from '../endpoints';

export default function SpecialitiesList() {
  useEffect(() => {
    axios.get(urlSpecialities).then((responce: AxiosResponse<specialityDTO[]>) => {
      console.log(responce.data);
    });
  }, []);

  return (
    <Box
      maxHeight="89vh"
      sx={{ overflow: 'hidden', overflowY: 'auto' }}
      className="bg-white m-3 p-3 rounded">
      <Header
        title="Специальности"
        buttonLink="create"
        buttonText="Создать специальность"
      />
      <ul>
        {specialities.map((elem) => {
          return (
            <CollapseListItem
              key={elem.id}
              customWidth="50%"
              displayName={elem.name}
              items={disciplines}
            />
          );
        })}
      </ul>
    </Box>
  );
}
