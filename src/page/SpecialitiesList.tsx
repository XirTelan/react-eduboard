import axios, { AxiosResponse } from 'axios';
import { Box, Button, Typography } from '@mui/material';

import CollapseListItem from '../components/UI/CollapseListItem';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
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
    <>
      <Header
        title="Специальности"
        buttonLink="create"
        buttonText="Создать специальность"
        buttonIcon={<PlaylistAddIcon />}
      />
      <Box
        maxHeight="89vh"
        sx={{ overflow: 'hidden', overflowY: 'auto' }}
        className="bg-white mx-2 p-1 rounded">
        <ul className="p-0">
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
    </>
  );
}
