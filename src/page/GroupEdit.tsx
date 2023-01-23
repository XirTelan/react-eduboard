import EditEntity from '../components/Entities/EditEntity';
import GroupForm from '../components/Form/GroupForm';
import { urlGroups } from '../endpoints';
import { GroupCreationDTO, GroupDTO } from '../data/types';

export default function GroupEdit() {
  return (
    <EditEntity<GroupCreationDTO, GroupDTO>
      urlEntity={urlGroups}
      urlListPage="/groups"
      entityName="группу">
      {(entity, edit) => (
        <>
          {entity && <GroupForm model={entity} onSubmit={async (values) => await edit(values)} />}
        </>
      )}
    </EditEntity>
  );
}
