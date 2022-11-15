import { disciplineDTO, specialityDTO, StudentDTO } from '../types';

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

export const students: StudentDTO[] = [
  { id: 1, name: 'Ivanov I I' },
  { id: 2, name: 'Petrov A G' },
  { id: 3, name: 'Sidorov G H' },
  { id: 4, name: 'Smith  J  ' },
  { id: 5, name: 'Smith  J  ' },
  { id: 6, name: 'Smith  J  ' },
  { id: 7, name: 'Smith  J  ' },
  { id: 8, name: 'Smith  J  ' },
  { id: 9, name: 'Smith  J  ' }
];
export const specialities: specialityDTO[] = [{ id: 1, name: 'asdasd', disciplinesId: [1, 2, 3] }];
