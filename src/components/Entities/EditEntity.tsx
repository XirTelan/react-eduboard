import { Box } from '@mui/material';
import { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../hooks/useAxios';
import { showAxiosErrorToast, showErrorToast } from '../../utils/notificationToast';
import Header from '../UI/Header';

export default function EditEntity<TCreation, TRead>(props: editEntityProps<TCreation, TRead>) {
  const navigate = useNavigate();
  const [entity, setEntity] = useState<TCreation>();
  const axiosPrivate = useAxios();

  const { id } = useParams();

  async function edit(entityToEdit: TCreation) {
    try {
      await axiosPrivate.put(`${props.urlEntity}/${id}`, entityToEdit);
      navigate(props.urlListPage);
    } catch (error) {
      showAxiosErrorToast(error);
    }
  }

  useEffect(() => {
    async function loadEntity() {
      try {
        const response = await axiosPrivate.get(`${props.urlEntity}/${id}`);
        setEntity(props.transform(response.data));
      } catch (error) {
        showAxiosErrorToast(error);
      }
    }
    loadEntity();
  }, [id]);

  return (
    <Box className="box-main">
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transform: (entity: any) => entity
};
