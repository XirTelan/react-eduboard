import { GridValidRowModel } from '@mui/x-data-grid';
import React from 'react';
import { controllRecordCreationDTO, inputData } from '../types';

export default function formatDataToGridRows(data: inputData[]) {
  return data.map((elem) => {
    const newElem: { [k: string]: any } = {
      id: elem.id,
      indx: elem.id,
      title: elem.title
    };
    elem.dataGridCells?.forEach((element) => {
      newElem[`${element.id}`] = element.value;
    });
    return newElem;
  });
}

export function formatGridRowsToData(
  typeId: number,
  month: number,
  year: string,
  data: readonly GridValidRowModel[]
) {
  const result: controllRecordCreationDTO[] = [];
  data.forEach((element) => {
    const { id, indx, title, ...obj2 } = element;
    Object.keys(obj2).forEach((key) => {
      if (obj2[key] === undefined) return;
      const newRecord: controllRecordCreationDTO = {
        StudentId: id,
        DisciplineId: +key,
        Month: month,
        Year: year,
        Value: obj2[key],
        ControllTypeId: typeId
      };
      result.push(newRecord);
    });
  });
  return result;
}
