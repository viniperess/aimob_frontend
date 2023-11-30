import { Employee } from "./employee";
import { RealEstateType } from "./realEstate";
import { Client } from "./client";

export interface Appointment {
    id: number;
    date: string;
    observation?: string | null;
    visitDate?: string | null;
    visitApproved?: boolean | null;
    clientId: number;
    client: Client;
    estateId: number;
    realEstate: RealEstateType;
    employeeId: number;
    employee: Employee;
  }