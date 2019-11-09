import { IAddress } from './AddressInterface';
import { IDonation} from './DonationInterface';



export interface IUser {
    firstName : String; 
    lastName : String; 
    email : String;
    phone : String;
    street : String;
    address : IAddress;
    cma : Number;
    isAdmin : Boolean;
    password : String;
    cart : Array<IDonation>; 
    donations : Array<IDonation>
}