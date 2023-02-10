import CollapseListItem from '../components/UI/CollapseListItem';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Header from '../components/UI/Header';
import { SpecialityDTO } from '../data/types';
import { urlSpecialities } from '../endpoints';
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
      <IndexEntity<SpecialityDTO> urlEntity={urlSpecialities}>
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
                    onDelete={(deleteEntity)}
                    items={entity.disciplines}
                  />
                );
              })}
          </>
        )}
      </IndexEntity>
    </>
  );
}
