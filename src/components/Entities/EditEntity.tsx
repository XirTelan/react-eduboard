import { Box } from '@mui/material';
import axios, { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../UI/Header';

export default function EditEntity<TCreation, TRead>(props: editEntityProps<TCreation, TRead>) {
  const navigate = useNavigate();
  const [entity, setEntity] = useState<TCreation>();

  const { id } = useParams();

  async function edit(entityToEdit: TCreation) {
    try {
      await axios.put(`${props.urlEntity}/${id}`, entityToEdit);
      navigate(props.urlListPage);
    } catch (error) {
      if (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    axios
      .get(`${props.urlEntity}/${id}`)
      .then((response: AxiosResponse<TRead>) => {
        setEntity(props.transform(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <Box className="bg-white p-3 m-3 rounded">
      <Header title={`Редактировать ${props.entityName}`} />
      {entity ? props.children(entity, edit) : ''}
    </Box>
  );
}

interface editEntityProps<TCreation, TRead> {
  urlEntity: string;
  urlListPage: string;
  entityName: string;
  transform(entity: TRead): TCreation;
  children(entity: TCreation, edit: (entity: TCreation) => void): React.ReactElement;
}
EditEntity.defaultProps = {
  transform: (entity: any) => entity
};
