import React from 'react';
import { inputData } from '../types';

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
