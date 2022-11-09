import { Autocomplete, IconButton, List, ListItem, TextField, Typography } from '@mui/material';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, useState } from 'react';
import { Box } from '@mui/system';
import { AnyARecord } from 'dns';
import { useField } from 'formik';

export default function AutocompleteField(props: autocompleteFieldProps) {
  const [inputValue, setInputValue] = useState('');

  function select(item: autocompleteFieldModel) {
    const selected = [...props.selected, item];
    const nonSelected = props.nonSelected.filter((elem) => elem !== item);
    props.onChange(selected, nonSelected);
    setInputValue('');
  }
  function deselect(item: autocompleteFieldModel) {
    const nonSelected = [...props.nonSelected, item];
    const selected = props.selected.filter((elem) => elem !== item);
    props.onChange(selected, nonSelected);
  }

  return (
    <>
      {/* <Typography marginBottom="1rem" variant="h4">
        {props.title}
      </Typography> */}
      <Autocomplete
        id="typeahead"
        disabled={props.nonSelected.length === 0}
        options={props.nonSelected}
        getOptionLabel={(elem) => elem.name}
        placeholder="asd"
        isOptionEqualToValue={(val, val2) => {
          return val.key === val2.key;
        }}
        inputValue={inputValue}
        value={null}
        onChange={(e, newValue) => {
          if (newValue) select(newValue);
        }}
        onInputChange={(event, value) => {
          setInputValue(value);
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.key}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Добавить дисциплину" />}
      />
      {/* <Typography margin="1rem 0" variant="h5">
        {props.selectedLabel}
      </Typography> */}
      {props.selected?.length === 0 ? (
        <div className="text-center m-5">
          <VisibilityOffIcon />
          <span className="text-secondary " style={{ margin: '0 2rem' }}>
            Список пуст
          </span>
        </div>
      ) : (
        <div className="w-100 ">
          <List
            sx={{
              justifyContent: 'left',
              flexWrap: 'wrap',
              display: 'flex',
              gap: '1rem',
              width: '100%',
              maxWidth: '100%'
            }}>
            {props.selected?.map((elem: autocompleteFieldModel) => {
              return (
                <ListItem
                  key={elem.key}
                  sx={{
                    border: '1px solid lightgrey',
                    borderRadius: '2rem',
                    flex: '0 1 20%',
                    minWidth: '0'
                  }}>
                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <Typography sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
                      {elem.name.toUpperCase()}
                    </Typography>
                    <IconButton
                      sx={{ width: '10px', height: '10px' }}
                      color="error"
                      onClick={() => deselect(elem)}>
                      <ClearIcon />
                    </IconButton>
                  </div>
                </ListItem>
              );
            })}
          </List>
        </div>
      )}
    </>
  );
}

interface autocompleteFieldProps {
  selected: autocompleteFieldModel[];
  nonSelected: autocompleteFieldModel[];
  onChange(selected: autocompleteFieldModel[], nonSelected: autocompleteFieldModel[]): void;
}

export interface autocompleteFieldModel {
  key: number;
  name: string;
}
