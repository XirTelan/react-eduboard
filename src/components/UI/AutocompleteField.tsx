import { Autocomplete, List, ListItem, TextField, Typography } from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

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
        renderInput={(params) => <TextField {...params} label="Добавить дисциплину" />}
      />
      <Typography margin="1rem 0" variant="h5">
        {props.selectedLabel}
      </Typography>
      <div className="my-3 d-flex justify-content-center">
        <List>
          {props.selectedItems?.length === 0 && (
            <>
              <VisibilityOffIcon />
              <span>{props.emptyLabel}</span>
            </>
          )}
          {props.selectedItems?.map((elem: any, indx: number) => {
            return <ListItem key={indx}>{elem.name}</ListItem>;
          })}
        </List>
      </div>
    </>
  );
}
