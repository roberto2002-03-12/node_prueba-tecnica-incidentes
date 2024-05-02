export interface IPayloadUser {
  sub: number;
  roles: string[];
  routes: string[];
};

export interface IPayloadRecovery {
  sub: number;
};