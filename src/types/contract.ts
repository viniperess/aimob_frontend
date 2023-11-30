import { Employee } from "./employee";
import { RealEstateType } from "./realEstate";
import { Client } from "./client";

export interface Contract {
    id: number;
    contractType: string;
    formOfPayment: string;
    date: string;
    finalValue: number;
    commission?: number | null;
    employeeId: number;
    employee: Employee;
    estateId: number;
    realEstate: RealEstateType;
    clientId: number;
    client: Client;
  }