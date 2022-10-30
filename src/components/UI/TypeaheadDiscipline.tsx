import { Typeahead } from 'react-bootstrap-typeahead';

export default function TypeaheadDiscipline(props: TypeaheadDisciplineProps) {
  const disciplines: disciplineDTO[] = [
    { id: 1, name: 'asdasd' },
    { id: 2, name: 'asd' }
  ];
  return (
    <>
      <Typeahead
        id="typeahead"
        onChange={(disc) => console.log(disc)}
        options={disciplines}
        filterBy={['name']}
        placeholder="asd"
      />
    </>
  );
}

interface TypeaheadDisciplineProps {
  displayName: string;
}
interface disciplineDTO {
  id: number;
  name: string;
}
