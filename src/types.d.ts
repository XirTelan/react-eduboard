export interface disciplineDTO {
  id: number;
  name: string;
}
export interface groupDTO {
  id: number;
  name: string;
  speciality: string;
  students: studentDTO[];
}
export interface specialityDTO {
  id: number;
  name: string;
  disciplinesId: number[];
}
export interface specialityCreationDTO {
  name: string;
  disciplinesId: number[];
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
  groupId: number;
}
