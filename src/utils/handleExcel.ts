import { useState } from 'react';
import { read, utils } from 'xlsx';

export function excelImport(file: File): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      const data = event.target!.result;
      const workbook = read(data, { type: 'binary' });
      console.log(workbook);
      workbook.SheetNames.forEach((sheet) => {
        const rowObjects = utils.sheet_to_json(workbook.Sheets[sheet]);
        console.log('rowObject', rowObjects);
        resolve(JSON.stringify(rowObjects, undefined, 4));
      });
    };
  });
}
