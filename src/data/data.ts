import { disciplineDTO, specialityDTO, studentDTO } from '../types';

export const months: string[] = [
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май'
];

export const disciplines: disciplineDTO[] = [
  { id: 1, name: 'Русский язык' },
  { id: 2, name: 'Математика язык' },
  { id: 3, name: 'Информатика язык' },
  { id: 4, name: 'Английский язык' }
];


export const specialities: specialityDTO[] = [{ id: 1, name: 'asdasd', disciplineIds: [1, 2, 3] }];
