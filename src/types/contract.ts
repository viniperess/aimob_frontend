import { RealEstateType } from "./realEstate";
import { User } from "./user";

export interface Contract {
    id: number;
    contractType: string;
    formOfPayment: string;
    date: string;
    finalValue: number;
    commission?: number | null;
    userId: number;
    employee: User;
    estateId: number;
    realEstate: RealEstateType;
    clientUserId: number;
    client: User;
  }