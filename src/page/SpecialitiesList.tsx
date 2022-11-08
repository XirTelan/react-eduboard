import { Box, Button, Typography } from '@mui/material';

import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { disciplines, specialities } from '../data/data';
import { disciplineDTO, specialityDTO } from '../types';

export default function SpecialitiesList() {
  return (
    <Box
      maxHeight="89vh"
      sx={{ overflow: 'hidden', overflowY: 'auto' }}
      className="bg-white m-3 p-3 rounded">
      <Header
        title="Специальности"
        buttonLink="specialities/create"
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
