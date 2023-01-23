import { GridValidRowModel } from '@mui/x-data-grid';
import { ControllRecordCreationDTO, InputData } from '../data/types';

export default function formatDataToGridRows(data: InputData[]) {
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
  const result: ControllRecordCreationDTO[] = [];
  data.forEach((element) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, indx, title, ...obj2 } = element;
    Object.keys(obj2).forEach((key) => {
      if (obj2[key] === undefined) return;
      const newRecord: ControllRecordCreationDTO = {
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
