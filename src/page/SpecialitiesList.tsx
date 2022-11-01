import {
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  ListItemButton,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Formik, useFormik } from 'formik';
import { purple, red } from '@mui/material/colors';
import { useState } from 'react';
import CollapseListItem from '../components/UI/CollapseListItem';

export default function SpecialitiesList() {
  const specialities2 = ['Русский язык', 'Математика', 'Английский', 'Физика', 'Электротехника'];
  const specialities = ['Русский язык', 'Математика', 'Информатика', 'Физика'];
  const specialities3 = [
    'Русский язык',
    'Математика',
    'Информатика',
    'Физика',
    'Английский',
    'Физика',
    'Электротехника'
  ];

  return (
    <>
      <Box className="bg-white m-3 rounded">
        <div style={{ display: 'block', padding: 30 }}>
          <Typography variant="h2" color="primary.main">
            Специальности
          </Typography>
          <Button className="my-3" variant="contained" size="large">
            Создать специальность
          </Button>
          <ul className="list-group">
            <CollapseListItem
              name="347 Очень длинное название специальности"
              specialities={specialities}
            />
            <CollapseListItem
              name="0125 Очень длинное название специальности 2"
              specialities={specialities3}
            />
            <CollapseListItem
              name="1654 Очень длинное название специальности 3"
              specialities={specialities2}
            />
            <CollapseListItem
              name="274 Очень длинное название специальности 4"
              specialities={specialities}
            />
            <CollapseListItem
              name="718 Очень длинное название специальности 5"
              specialities={specialities}
            />
            <CollapseListItem
              name="0125 Очень длинное название специальности 6"
              specialities={specialities2}
            />
            <CollapseListItem
              name="2754 Очень длинное название специальности 7"
              specialities={specialities3}
            />
          </ul>
        </div>
      </Box>
    </>
  );
}
