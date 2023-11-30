import { Appointment } from "./appointment";
import { Contract } from "./contract";
import { User } from "./user";


export interface Client {
    id: number;
    street: string;
    number: string;
    complement?: string;
    district: string;
    zipCode: string;
    phone: string;
    city: string;
    state: string;
    cpf: string;
    userId: number;
    user: User;
    appointments: Appointment[];
    contracts: Contract[];
  }