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
