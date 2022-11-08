import { Autocomplete, IconButton, List, ListItem, TextField, Typography } from '@mui/material';

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ClearIcon from '@mui/icons-material/Clear';
import { ChangeEvent, useState } from 'react';
import { Box } from '@mui/system';
import { AnyARecord } from 'dns';
import { useField } from 'formik';

export default function AutocompleteField(props: any) {
  const [fieldInput, fieldMeta, fieldHelpers] = useField('students');

  return (
    <>
      <Typography marginBottom="1rem" variant="h4">
        {props.title}
      </Typography>
      <Autocomplete
        id="typeahead"
        disabled={props.commonItems.length === 0}
        options={props.commonItems}
        getOptionLabel={(elem) => elem.name}
        placeholder="asd"
        isOptionEqualToValue={(val, val2) => {
          return val.id === val2.id;
        }}
        inputValue={props.inputValue}
        value={props.value || null}
        onChange={(e, newValue) => {
          props.setSelectedItems((prevValue: any) => props.handleChange(prevValue!, newValue!));
        }}
        onInputChange={(event, value) => {
          props.setInputValue(value);
        }}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              {option.name}
            </li>
          );
        }}
        renderInput={(params) => <TextField {...params} label="Добавить дисциплину" />}
      />
      <Typography margin="1rem 0" variant="h5">
        {props.selectedLabel}
      </Typography>
      {props.selectedItems?.length === 0 ? (
        <div className="text-center">
          <VisibilityOffIcon />
          <span className="text-secondary" style={{ margin: '0 2rem' }}>
            Список пуст
          </span>
        </div>
      ) : (
        <div className="w-100">
          <List
            sx={{
              justifyContent: 'left',
              flexWrap: 'wrap',
              display: 'flex',
              gap: '1rem',
              width: '100%',
              maxWidth: '100%'
            }}>
            {props.selectedItems?.map((elem: any) => {
              return (
                <ListItem
                  key={elem.id}
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
                      onClick={() => props.removeSelectedItem(elem.id)}>
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
