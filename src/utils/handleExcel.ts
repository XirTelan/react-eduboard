import { useState } from 'react';
import { read, utils } from 'xlsx';
import { studentCreationDTO, studentExcelCreationDTO } from '../types';

export function excelImport(file: File, type: 'any' | 'students' = 'any'): Promise<any> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      const data = event.target!.result;
      const workbook = read(data, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        const rowObjects =
          type === 'students'
            ? utils.sheet_to_json(workbook.Sheets[sheet], {
                range: 1,
                header: ['secondName', 'firstName', 'middleName', 'groupName']
              })
            : utils.sheet_to_json(workbook.Sheets[sheet]);
        resolve(JSON.stringify(rowObjects, undefined, 4));
      });
    };
  });
}

export function convertJsonToStudentDTO(value: any): studentExcelCreationDTO[] {
  const jsonObj = JSON.parse(value);
  return jsonObj as studentExcelCreationDTO[];
}
