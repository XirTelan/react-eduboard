import { Box, Button, TextField } from '@mui/material';
import { Form, Formik, FormikHelpers, useFormikContext, validateYupSchema } from 'formik';
import { ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { disciplineDTO, specialityCreationDTO, specialityDTO } from '../../types';
import AutocompleteField, { autocompleteFieldModel } from '../UI/AutocompleteField';
import * as Yup from 'yup';

export default function SpecialityForm(props: SpecialityFormProps) {
  const [inputValue, setInputValue] = useState('');
  const [selectedDisc, setSelectedDisc] = useState(mapToModel(props.seletedDisciplined));
  const [nonSelectedDisciplines, setNonSelectedDisciplines] = useState(
    mapToModel(props.nonSelectedDisciplines)
  );
  const [value, setValue] = useState<disciplineDTO | null>();

  const handleChange = (
    seleted: autocompleteFieldModel[],
    nonSelected: autocompleteFieldModel[]
  ) => {
    setNonSelectedDisciplines(nonSelected);
    setSelectedDisc(seleted);
    setValue(null);
    setInputValue('');
  };

  function mapToModel(items: { id: number; name: string }[]): autocompleteFieldModel[] {
    return items.map((item) => {
      return { key: item.id, name: item.name };
    });
  }
  return (
    <Formik
      initialValues={props.model}
      onSubmit={async (val, actions) => {
        val.disciplineIds = selectedDisc.map((item) => item.key);
        props.onSubmit(val, actions);
      }}
      validationSchema={Yup.object({
        name: Yup.string().required('This field is required')
      })}>
      {(formikProps) => {
        return (
          <>
            <Form onSubmit={formikProps.handleSubmit}>
              <Box className="box-main pb-3  mb-1 ">
                <TextField
                  {...formikProps.getFieldProps('name')}
                  margin="normal"
                  fullWidth
                  label="Наименование"
                />
                {formikProps.errors.name && <span>{formikProps.errors.name}</span>}
                <AutocompleteField
                  selected={selectedDisc}
                  nonSelected={nonSelectedDisciplines}
                  onChange={handleChange}
                />
              </Box>

              <Box className="box-main d-flex justify-content-between">
                <Link className="btn btn-secondary fw-bold " to="/specialities">
                  Назад
                </Link>
                <Button
                  variant="contained"
                  color="success"
                  disabled={formikProps.isSubmitting}
                  type="submit"
                  className="fw-bold">
                  {props.specialityEdit ? 'Сохранить изменения' : 'Создать'}
                </Button>
              </Box>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

interface SpecialityFormProps {
  model: specialityCreationDTO;
  seletedDisciplined: disciplineDTO[];
  nonSelectedDisciplines: disciplineDTO[];
  specialityEdit?: specialityDTO;
  onSubmit(values: specialityCreationDTO, actions: FormikHelpers<specialityCreationDTO>): void;
}
