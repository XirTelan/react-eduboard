import EditEntity from '../components/Entities/EditEntity';
import GroupForm from '../components/Form/GroupForm';
import { urlGroups } from '../endpoints';
import { groupCreationDTO, groupDTO } from '../types';

export default function GroupEdit() {
  return (
    <EditEntity<groupCreationDTO, groupDTO>
      urlEntity={urlGroups}
      urlListPage="/groups"
      entityName="группу">
      {(entity, edit) => (
        <>
          {console.log("Entity" ,entity)}
          {entity && <GroupForm model={entity}  onSubmit={async (values) => await edit(values)} />}
        </>
      )}
    </EditEntity>
  );
}
