import { Appointment } from "./appointment";
import { Contract } from "./contract";
import { User } from "./user";

export enum RealEstateTypeEnum {
    HOUSE,
    APARTMENT
  }
  
  export interface RealEstateType {
    id: number;
    street: string;
    number: string;
    complement?: string;
    district: string;
    zipCode: string;
    city: string;
    state: string;
    builtArea: number;
    totalArea: number;
    bedrooms: number;
    bathrooms: number;
    livingRooms: number;
    kitchens: number;
    garage: boolean;
    type: RealEstateTypeEnum;
    description: string;
    salePrice?: number | null;
    rentPrice?: number | null;
    status: boolean;
    registration: string;
    images: string[];
    userId: number;
    employee: User;
    clientUserId: number;
    client: User;
    appointments: Appointment[]; // Relacionamento one-to-many
    contract?: Contract; // Relacionamento one-to-one
  }