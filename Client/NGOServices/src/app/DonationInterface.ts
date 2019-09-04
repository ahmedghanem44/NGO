import {IEvent} from './EventInterface';

export interface IDonation{
    event : IEvent,
    amount : Number,
    dateOfDonation : Date,
    isRecurring : Boolean
}