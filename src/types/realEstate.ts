import { Appointment } from "./appointment";


  
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
    type: string;
    description: string;
    salePrice?: number | null;
    rentPrice?: number | null;
    status: boolean;
    registration: string;
    images: string[];
    userId: number;
    contactId: number;
    appointments: Appointment[];
  }