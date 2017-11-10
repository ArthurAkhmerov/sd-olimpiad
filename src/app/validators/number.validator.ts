import { FormControl, Validators, ValidatorFn } from "@angular/forms";

export function NumberValidator(prms:{min:number,max:number}): ValidatorFn {
    return (control: FormControl): {[key: string]: any} => {
      let val: number = control.value;

      if(val == null || isNaN(val) || /\D/.test(val.toString())) {

        return {"number": true};
      } else if(!isNaN(prms.min) && !isNaN(prms.max)) {

        return val < prms.min || val > prms.max ? {"number": true} : null;
      } else if(!isNaN(prms.min)) {

        return val < prms.min ? {"number": true} : null;
      } else if(!isNaN(prms.max)) {

        return val > prms.max ? {"number": true} : null;
      } else {

        return null;
      }
    };
  }