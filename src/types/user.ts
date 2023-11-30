import { Owner } from "./owner";
import { Employee } from "./employee";
import { Client } from "./client";

export interface User {
    id: number;
    user: string;
    name: string;
    email: string;
    password: string;
    roles: Role;
    createdAt: string;
    employee?: Employee;
    owner?: Owner;
    client?: Client;
  }
  
  export enum Role {
    CLIENT,
    EMPLOYEE,
    OWNER
  }