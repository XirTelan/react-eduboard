import { Typography } from '@mui/material';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CollapseListItem from '../components/UI/CollapseListItem';
import Header from '../components/UI/Header';
import { groupDTO } from '../types';
import { urlGroups } from '../endpoints';
import IndexEntity from '../components/Entities/IndexEntity';
import { createNonNullChain } from 'typescript';

export default function GroupList() {
  return (
    <>
      <Header
        title="Группы"
        buttonIcon={<GroupAddIcon />}
        buttonText="Создать группу"
        buttonLink="create"
      />

      <IndexEntity<groupDTO> urlEntity={urlGroups}>
        {(groups, deleteEntity) => {
          console.log(groups);
          return (
            <>
              <ul className="p-0">
                {groups.map((group) => {
                  return (
                    <CollapseListItem
                      id={group.id}
                      key={group.id}
                      displayName={group.name}
                      onDelete={deleteEntity}
                      additionalInfo={group.speciality && group.speciality.name}
                      items={group.students.map((student) => {
                        return {
                          id: student.id,
                          name: `${student.secondName} ${student.firstName} ${student.middleName}`
                        };
                      })}>
                      <div className="d-flex flex-column m-3 gap-2">
                        <Typography
                          sx={{
                            width: '100%'
                          }}
                          variant="h5">
                          Куратор: {group.person.fio === '' ? 'Не выбрано' : group.person.fio}
                        </Typography>
                        <Typography
                          sx={{
                            width: '100%'
                          }}
                          variant="body1"></Typography>
                        <Typography variant="h5">Список студентов группы:</Typography>
                      </div>
                    </CollapseListItem>
                  );
                })}
              </ul>
            </>
          );
        }}
      </IndexEntity>
    </>
  );
}
