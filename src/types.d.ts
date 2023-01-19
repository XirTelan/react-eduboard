export interface AttendanceCreationDTO {
  StudentId: number;
  Day: number;
  Month: number;
  Year: string;
  Value: string;
}

export interface controllRecordCreationDTO {
  StudentId: number;
  ControllTypeId: number;
  DisciplineId: number;
  Month: number;
  Year: string;
  Value: string;
}

export interface linkInfo {
  to: string;
  title: string;
  icon: React.ReactElement;
}

export interface disciplineDTO {
  id: number;
  name: string;
}
export interface disciplineCreationDTO {
  name: string;
}
export interface groupDTO {
  id: number;
  name: string;
  speciality: specialityDTO;
  person: userViewDTO;
  students: studentDTO[];
}
export interface groupCreationDTO {
  name: string;
  specialityId?: number;
  year: string;
  personId?: string;
  studentsId?: number[];
}
export interface specialityDTO {
  id: number;
  name: string;
  disciplines: disciplineDTO[];
}
export interface specialityEditDTO {
  speciality: specialityDTO;
  selectedDisciplines: disciplineDTO[];
  nonSelectedDisciplines: disciplineDTO[];
}
export interface specialityCreationDTO {
  name: string;
  disciplineIds?: number[];
}

export interface studentDTO {
  id: number;
  firstName: string;
  secondName: string;
  middleName: string;
  group: groupDTO;
}
export interface studentCreationDTO {
  firstName: string;
  secondName: string;
  middleName: string;
  groupId?: number;
}
export interface studentExcelCreationDTO {
  firstName: string;
  secondName: string;
  middleName: string;
  groupName: string;
}

export interface userViewDTO {
  id: string;
  fio: string;
}
export interface inputData {
  id: number;
  title: string;
  dataGridCells: { id: number; value: string }[];
}
