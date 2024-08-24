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
    builtArea: string;
    totalArea: string;
    bedrooms: string;
    bathrooms: string;
    livingRooms: string;
    kitchens: string;
    garage: boolean;
    type: string;
    description: string;
    salePrice?: string | null;
    rentPrice?: string | null;
    status: boolean;
    registration: string;
    images: string[];
    userId: string;
    contactId: string;
    appointments: Appointment[];
  }