import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Button,
  Divider,
  TextField
} from '@mui/material';
import { Form, Formik, useFormikContext } from 'formik';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { disciplines } from '../../data/data';
import { disciplineDTO } from '../../types';
import AutocompleteField from '../UI/AutocompleteField';

export default function SpecialityForm({ name, selectedDisciplines }: SpecialityFormProps) {
  const [inputValue, setInputValue] = useState(() => (name ? name : ''));
  const [selectedDisc, setSelectedDisc] = useState<disciplineDTO[] | null>(() =>
    selectedDisciplines ? selectedDisciplines : []
  );
  const [commonDisc, setCommonDisc] = useState(disciplines);
  const [value, setValue] = useState<disciplineDTO | null>();

  const getNewArray = (value: disciplineDTO[], newValue: disciplineDTO) => {
    return [...value, newValue].sort((a, b) => a.name.localeCompare(b.name));
  };
  const handleChange = (value: disciplineDTO[], newValue: disciplineDTO) => {
    setCommonDisc((prevVal) => prevVal.filter((elem) => elem.id !== newValue.id));
    setSelectedDisc(getNewArray(value, newValue));
    setValue(null);
    setInputValue('');
  };

  const removeSelectedItem = (id: number) => {
    const item = selectedDisc?.find((elem) => elem.id === id);
    setCommonDisc((prevVal) => [...prevVal, item!]);
    setSelectedDisc((prevVal) => {
      if (prevVal) return prevVal.filter((elem) => elem.id !== id);
      else throw new Error('Selected Items Collection is null');
    });
  };

  return (
    <Formik
      initialValues={{ name: '', students: [] }}
      onSubmit={(val) => {
        console.log({ ...selectedDisc });
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
              selectedLabel="Выбранные дисциплины"
              commonItems={commonDisc}
              value={value}
              setValue={setValue}
              handleChange={handleChange}
              inputValue={inputValue}
              setInputValue={setInputValue}
              setCommonItems={setCommonDisc}
              selectedItems={selectedDisc}
              setSelectedItems={setSelectedDisc}
              removeSelectedItem={removeSelectedItem}
            />
            <Divider className="m-3" />
            <div className="text-center">
              <Link className="btn btn-secondary m-1" to="/specialities">
                Назад
              </Link>
              <Button
                sx={{ width: '90%', backgroundColor: 'success.main' }}
                variant="contained"
                disabled={formikProps.isSubmitting}
                type="submit">
                Создать
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}

interface SpecialityFormProps {
  name?: string;
  selectedDisciplines?: disciplineDTO[];
}
