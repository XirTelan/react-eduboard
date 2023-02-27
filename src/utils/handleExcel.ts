import { read, utils, writeFile } from 'xlsx';
import { ControlRecord, GradeRecord, StudentExcelCreationDTO } from '../data/types';

export function excelImport(file: File, type: 'any' | 'students' = 'any'): Promise<any> {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(file);
    fileReader.onload = (event) => {
      const data = event.target?.result;
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
export const convertControllRecordXlsxToData = (data: { [k: string]: any }[]) => {
  const results: ControlRecord[] = [];
  data.forEach((elem) => {
    const fullName = elem['ФИО'];
    console.log('fullname', fullName);
    const list = Object.entries(elem)
      .filter(([key, value]) => `${key}` !== 'ФИО')
      .map(([key, value]) => {
        const controlRecordExcel: GradeRecord = {
          disciplineName: key,
          grade: value
        };
        return controlRecordExcel;
      });
    const record: ControlRecord = {
      fullName: fullName,
      records: list
    };
    results.push(record);
  });
  return results;
};

export const getDataTemplate = (rows: any) => {
  const htmlTitles = [...document.getElementsByClassName('MuiDataGrid-columnHeaderTitle')];
  const titles = htmlTitles.map((elem) => elem.innerHTML).filter((elem) => elem !== '№');
  const studentsList = rows.map((row: any) => row.title);
  const worksheet = utils.aoa_to_sheet([titles]);

  for (let i = 0; i < studentsList.length; i++) {
    const cellRef = 'A' + (i + 2);
    const cellValue = studentsList[i];
    worksheet[cellRef] = { t: 's', v: cellValue };
  }
  if (!worksheet['!cols']) worksheet['!cols'] = [];
  worksheet['!cols'][0] = { wch: 30 };
  const range = worksheet['!ref'];
  const rangeObj = utils.decode_range(range as string);
  rangeObj.e.r = studentsList.length + 1;
  rangeObj.e.c = titles.length;
  const newRange = utils.encode_range(rangeObj);
  worksheet['!ref'] = newRange;
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, 'Sheet1');
  writeFile(workbook, 'output.xlsx');
};

export function convertJsonToStudentDTO(value: any): StudentExcelCreationDTO[] {
  const jsonObj = JSON.parse(value);
  return jsonObj as StudentExcelCreationDTO[];
}
