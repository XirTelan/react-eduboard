export interface claim {
  name: string;
  value: string;
}

export interface userCredentials{
    userName: string;
    password: string;
}

export interface authenticationResponse{
    token: string;
    expiration: Date;
}
