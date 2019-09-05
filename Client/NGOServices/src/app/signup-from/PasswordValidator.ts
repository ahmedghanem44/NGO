import {AbstractControl} from '@angular/forms';
export class PasswordValidation {

    static MatchPassword(con: AbstractControl) {
       let password = con.get('password').value; // to get value in input tag
       let confirmPassword = con.get('confirmPassword').value; // to get value in input tag
        if(password != confirmPassword) {
            console.log('false');
            con.get('confirmPassword').setErrors( {MatchPassword: true} )
        } else {
            console.log('true');
            return null
        }
    }
}