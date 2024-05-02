
export interface RoleRequest extends Request {
  user?: {
    role: string;
  }
};