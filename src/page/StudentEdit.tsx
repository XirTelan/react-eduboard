import React from 'react';
import EditEntity from '../components/Entities/EditEntity';
import StudentForm from '../components/Form/StudentForm';
import { urlStudents } from '../endpoints';
import { studentCreationDTO, studentDTO } from '../types';

export default function StudentEdit() {
  return (
    <EditEntity<studentCreationDTO, studentDTO>
      urlEntity={urlStudents}
      urlListPage="/students"
      entityName="студента">
      {(entity, edit) => (
        <>
          {entity && <StudentForm model={entity} onSubmit={async (values) => await edit(values)} />}
        </>
      )}
    </EditEntity>
  );
}
