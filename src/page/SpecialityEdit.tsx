import { Box } from '@mui/material';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { JSXElementConstructor, ReactElement, useEffect, useState } from 'react';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import EditEntity from '../components/Entities/EditEntity';
import SpecialityForm from '../components/Form/SpecialitytForm';
import Header from '../components/UI/Header';
import { disciplines, specialities } from '../data/data';
import { urlSpecialities } from '../endpoints';
import { specialityCreationDTO, specialityDTO } from '../types';

export default function SpecialityEdit() {
  return (
    <EditEntity<specialityCreationDTO, specialityDTO>
      urlEntity={urlSpecialities}
      urlListPage="/specialities"
      entityName="Специальности">
      {(entity, edit) =>
        entity && (
          <SpecialityForm
            model={entity}
            seletedDisciplined={[]}
            nonSelectedDisciplines={disciplines}
            onSubmit={async (values) => await edit(values)}
          />
        )
      }
    </EditEntity>
  );
}
