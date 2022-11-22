import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  Select,
  Typography
} from '@mui/material';

import CollapseListItem from '../components/UI/CollapseListItem';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Header from '../components/UI/Header';
import { disciplines, specialities } from '../data/data';
import { disciplineDTO, specialityDTO } from '../types';
import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { urlSpecialities } from '../endpoints';
import Pagination from '../components/UI/Pagination';
import IndexEntity from '../components/Entities/IndexEntity';

export default function SpecialitiesList() {
  return (
    <>
      <Header
        title="Специальности"
        buttonLink="create"
        buttonText="Создать специальность"
        buttonIcon={<PlaylistAddIcon />}
      />
      <IndexEntity<specialityDTO> urlEntity={urlSpecialities}>
        {(entities, deleteEntity) => (
          <>
            {entities &&
              entities.map((entity) => {
                return (
                  <CollapseListItem
                    id={entity.id}
                    key={entity.id}
                    customWidth="50%"
                    displayName={entity.name}
                    onDelete={deleteEntity}
                    items={disciplines}
                  />
                );
              })}
          </>
        )}
      </IndexEntity>
    </>
  );
}
