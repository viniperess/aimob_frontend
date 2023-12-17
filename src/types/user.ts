export interface User {
    id: number;
    user: string;
    name: string;
    email: string;
    password: string;
    birthdate: Date;
    cpf:  string;
    street?:  string;
    number?: string;
    complement?: string;
    district?: string;
    city?: string;
    zipCode?: string;
    phone?: string;
    creci?: string;
    isAdmin: boolean;
    roles: Role;
    createdAt: string;
  }
  
  export enum Role {
    CLIENT = "CLIENT",
    EMPLOYEE = "EMPLOYEE"
  }