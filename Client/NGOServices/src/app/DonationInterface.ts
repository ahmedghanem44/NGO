import {IEvent} from './EventInterface';
import { IUser } from './UserInterface';

export interface IDonation{
    user : String,
    event : String,
    amount : Number,
    dateOfDonation : Date,
    isRecurring : Boolean
}