export interface specialityDTO {
  id: number;
  name: string;
  disciplinesId: number[];
}
export interface specialityCreationDTO {
  name: string;
  disciplinesId: number[];
}


export interface disciplineDTO {
  id: number;
  name: string;
}
export interface groupDTO {
  id: number;
  name: string;
  speciality: string;
  students: StudentDTO[];
}
export interface StudentDTO {
  id: number;
  name: string;
}
