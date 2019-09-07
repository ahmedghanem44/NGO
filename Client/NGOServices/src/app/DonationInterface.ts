import {IEvent} from './EventInterface';
import { IUser } from './UserInterface';

export interface IDonation{
    user : IUser,
    event : IEvent,
    amount : Number,
    dateOfDonation : Date,
    isRecurring : Boolean
}