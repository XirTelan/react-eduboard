export interface claim {
  name: string;
  value: string;
}
export enum Roles {
  ADMIN = 'Admin',
  USER = 'User',
  MANAGEMENT = 'Management'
}
export interface userCredentials {
  userName: string;
  password: string;
}
export interface userRoleDTO {
  userId: string;
  role: string;
}
export interface userDTO {
  id: string;
  userName: string;
  fio: string;
  roles: string[];
}
export interface userRegisterCredentials {
  userName: string;
  password: string;
  fio: string;
}

export interface authenticationResponse {
  token: string;
  expiration: Date;
}
