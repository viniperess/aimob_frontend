import { User } from "./user";
import { RealEstateType } from "./realEstate";


export interface Appointment {
    id: number;
    date: string;
    observation?: string | null;
    visitDate?: string | null;
    visitApproved?: boolean | null;
    clientUserId: number;
    client: User;
    estateId: number;
    realEstate: RealEstateType;
    userId: number;
    employee: User;
  }