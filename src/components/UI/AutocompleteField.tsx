import { Autocomplete, TextField } from '@mui/material';

export default function AutocompleteField(props: TypeaheadDisciplineProps) {
  const disciplines: disciplineDTO[] = [
    { id: 1, name: 'asdasd' },
    { id: 2, name: 'asd' }
  ];
  return (
    <>
      <Autocomplete
        id="typeahead"
        options={disciplines}
        getOptionLabel={(disciplines) => disciplines.name}
        placeholder="asd"
        renderInput={(params) => <TextField {...params} label={props.displayName} />}
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
