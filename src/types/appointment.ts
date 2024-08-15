import { User } from "./user";
import { RealEstateType } from "./realEstate";
import { Contact } from "./contact";


export interface Appointment {
    id: number;
    date: string;
    observation?: string | null;
    visitDate?: string | null;
    visitApproved?: boolean | null;
    contactId: number;
    contact: Contact;
    estateId: number;
    realEstate: RealEstateType;
    userId: User;
  }