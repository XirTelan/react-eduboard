import { Autocomplete, AutocompleteRenderInputParams, Button, TextField } from '@mui/material';
import { Form, Formik, useFormikContext } from 'formik';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import AutocompleteField from '../UI/AutocompleteField';

export default function SpecialityForm() {
  const disciplines: disciplineDTO[] = [
    { id: -1, name: '123123' },
    { id: 1, name: 'asdasd' },
    { id: 2, name: 'asd' }
  ];
  const [inputValue, setInputValue] = useState('');
  const [selectedDisc, setSelectedDisc] = useState<disciplineDTO[] | null>([]);
  const [commonDisc, setCommonDisc] = useState(disciplines);
  const [value, setValue] = useState<disciplineDTO | null>();

  const getNewArray = (value: disciplineDTO[], newValue: disciplineDTO) => {
    return [...value, newValue];
  };
  const handleChange = (value: disciplineDTO[], newValue: disciplineDTO) => {
    setCommonDisc(commonDisc.filter((elem) => elem.id !== newValue.id));
    setSelectedDisc(getNewArray(value, newValue));
    setValue(null);
    setInputValue('');
  };
  return (
    <Formik
      initialValues={{ name: '', students: [] }}
      onSubmit={(val) => {
        console.log(val);
      }}>
      {(formikProps) => {
        return (
          <Form onSubmit={formikProps.handleSubmit}>
            <TextField
              {...formikProps.getFieldProps('name')}
              margin="normal"
              fullWidth
              label="Наименование"
            />
            <AutocompleteField
              commonItems={commonDisc}
              value={value}
              setValue={setValue}
              handleChange={handleChange}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setCommonItems={setCommonDisc}
              selectedItems={selectedDisc}
              setSelectedItems={setSelectedDisc}
            />
            <Button disabled={formikProps.isSubmitting} type="submit">
              Save Changes
            </Button>
            <Link className="btn btn-secondary m-1" to="/users">
              Cancel
            </Link>
          </Form>
        );
      }}
    </Formik>
  );
}

interface TypeaheadDisciplineProps {
  displayName: string;
}
interface disciplineDTO {
  id: number;
  name: string;
}
