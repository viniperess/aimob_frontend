import { Appointment } from "./appointment";
import { Contact } from "./contact";
import { RealEstateType } from "./realEstate";

export interface Task {
id: number,
status: string,
description: string,
estateId?: number,
contactId?: number,
appointmentId?: number
realEstate?: RealEstateType;
contact?: Contact;
appointment?: Appointment;
}