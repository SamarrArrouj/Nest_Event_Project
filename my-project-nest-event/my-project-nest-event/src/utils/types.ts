import { UserRole } from "src/typeorm/entities/User";

export type CreateUserParams = {
    username: string;
    email: string;
    password: string;
    role?: UserRole;
  }
  
  export type UpdateUserParams = {
    username?: string;  
    email?: string;     
    password?: string;  
    role?: UserRole;  
  }
  