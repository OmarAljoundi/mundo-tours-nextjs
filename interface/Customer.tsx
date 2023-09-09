import { ITour } from "./Tour";
import { IUser } from "./User";

export interface ICustomer {
  id: number;
  tourId: number;
  assignedTo?: string;
  phoneNumber: string | null;
  email: string | null;
  name: string | null;
  notes: string | null;
  contactMethod: string | null;
  status: eCustomerStatus;
  createdDate: string | null;
  modifiedDate: string | null;
  Tour?: ITour | null;
  user?: IUser | null;
}

export enum eCustomerStatus {
  All = 0,
  Pending = 1,
  Completed = 2,
  No_Answer = 3,
}
