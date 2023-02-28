export interface claim {
  name: string;
  value: string;
}

export interface userCredentials {
  userName: string;
  password: string;
}
export interface userRoleDTO {
  userId: string;
  role: string;
  isDeleteFlag: boolean = false;
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
