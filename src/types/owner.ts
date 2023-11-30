import { RealEstateType } from "./realEstate";
import { User } from "./user";

export interface Owner {
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
  realEstates: RealEstateType[]; // Relacionamento one-to-many
}
