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
  students: studentDTO[];
}
export interface groupCreationDTO {
  name: string;
  specialityId: number;
  year: string;
  curatorId?: number;
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
export interface userDTO {
  id: string;
  userName: string;
  fio: string;
  role: string;
}
