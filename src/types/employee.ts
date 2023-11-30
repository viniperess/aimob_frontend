import { Appointment } from "./appointment";
import { Contract } from "./contract";
import { RealEstateType } from "./realEstate";
import { User } from "./user";

export interface Employee {
    id: number;
    birthdate: string;
    city: string;
    cpf: string;
    creci?: string;
    isAdmin: boolean;
    userId: number;
    user: User;
    appointments: Appointment[];
    contracts: Contract[];
    realEstates: RealEstateType[];
  }