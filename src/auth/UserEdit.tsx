import React from 'react';
import EditEntity from '../components/Entities/EditEntity';
import { urlAccounts } from '../endpoints';
import { userRegisterCredentials, userDTO } from './auth.model';
import AuthForm from './AuthForm';
import Register from './Register';

export default function UserEdit() {
  return (
    <EditEntity<userRegisterCredentials, userDTO>
      urlEntity={urlAccounts}
      urlListPage="/groups"
      entityName="группу">
      {(entity, edit) => (
        <>{entity && <AuthForm model={entity} onSubmit={async (values) => await edit(values)} />}</>
      )}
    </EditEntity>
  );
}
