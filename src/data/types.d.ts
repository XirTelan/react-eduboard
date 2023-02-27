export interface AttendanceCreationDTO {
  StudentId: number;
  Day: number;
  Month: number;
  Year: string;
  Value: string;
}

export interface ControllRecordCreationDTO {
  StudentId: number;
  ControllTypeId: number;
  DisciplineId: number;
  Month: number;
  Year: string;
  Value: string;
}

export interface LinkInfo {
  to: string;
  title: string;
  icon: React.ReactElement;
}

export interface DisciplineDTO {
  id: number;
  name: string;
}
export interface DisciplineCreationDTO {
  name: string;
}
export interface GroupDTO {
  id: number;
  name: string;
  year: string;
  speciality: SpecialityDTO;
  person: UserViewDTO;
  students: StudentDTO[];
}
export interface GroupCreationDTO {
  name: string;
  specialityId?: number;
  year: string;
  personId?: string;
  studentsId?: number[];
}
export interface SpecialityDTO {
  id: number;
  name: string;
  disciplines: DisciplineDTO[];
}
export interface SpecialityEditDTO {
  speciality: SpecialityDTO;
  selectedDisciplines: DisciplineDTO[];
  nonSelectedDisciplines: DisciplineDTO[];
}
export interface SpecialityCreationDTO {
  name: string;
  disciplineIds?: number[];
}

export interface StudentDTO {
  id: number;
  firstName: string;
  secondName: string;
  middleName: string;
  group: GroupDTO;
}
export interface StudentCreationDTO {
  firstName: string;
  secondName: string;
  middleName: string;
  groupId?: number;
}
export interface StudentExcelCreationDTO {
  firstName: string;
  secondName: string;
  middleName: string;
  groupName: string;
}
export interface DirectoryInfo {
  id: number;
  displayName: string;
  systemName: string;
  isFolder: boolean;
  parentFolderId: number;
}
export interface UserViewDTO {
  id: string;
  fio: string;
}
export interface InputData {
  id: number;
  title: string;
  dataGridCells: { id: number; value: string }[];
}

export type ControlRecord = {
  fullName: string;
  records: GradeRecord[];
};
export type GradeRecord = {
  disciplineName: string;
  grade: string;
};
export type ControllRecordImport = {
  ControllTypeId: number;
  StudentRecords: ControlRecord[];
  Month: number;
  Year: string;
};
