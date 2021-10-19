import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {


  constructor() { }
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'שדה חובה',
      'invalidId': 'נא להקיש ת"ז תקינה',
      'invalidDate': 'שדה זה צריך להיות גדול או שווה להיום',
      'borndate': 'נא להקיש תאריך לידה תקין',
      'minlength': `שדה זה צריך להיות באורך של  ${validatorValue.requiredLength} תוים לפחות`,
      'maxlength': `שדה זה צריך להיות באורך של עד  ${validatorValue.requiredLength} תוים `,
      'invalidEmail': 'כתובת דוא"ל לא חוקית',
      'invalidLiscence': 'נא להקיש רשיון בעל 8 תווים',
      'invalidPassword': 'נא להקיש סיסמה בעלת 8 תווים',
      'onlyLetters': 'יש להקיש אותיות בלבד',
      'onlyNumbers': 'יש להקיש ספרות בלבד'
    };
    return config[validatorName];
  }
  static emailValidator(control: FormControl) {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (control.value && !EMAIL_REGEXP.test(control.value)) {
      return { 'invalidEmail': true };
    }
    return null;
  }

  static passwordValidator(control: FormControl) {
    // {8,20}           - Assert password is between 6 and 20 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value && control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,20}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static liscenceValidator(control: FormControl) { }
  static borndateValidator(control: FormControl) {
    const today = new Date();
    var borndate = new Date(control.value);
    var age = today.getFullYear() - borndate.getFullYear();
    var m = today.getMonth() - borndate.getMonth();
    if (m < 0 || (m == 0 && today.getDate() < borndate.getDate())) {
      age--;
    }

    if (!(age >= 0 || age <= 120))
      return { 'borndate': true }
    null;
  }

  static numbersValidator(control: FormControl) {
    const dig = /^\d+$/;
    if (control.value && !dig.test(control.value)) {
      return { 'onlyNumbers': true };
    }
    return null;
  }

  static lettersValidator(control: FormControl) {
    const letter = /^[a-z\u0590-\u05fe]+$/i;
    if (control.value && !letter.test(control.value)) {
      return { 'onlyLetters': true };
    }
    return null;
  }


  static idValidator(control: FormControl) {
    if (control.value) {
      let id = control.value;
      let strId = String(id).trim();
      if (strId.length > 9) {
        return false;
      }
      if (strId.length < 9) {
        while (strId.length < 9) strId = "0" + strId;
      }
      let counter = 0, rawVal, actualVal;
      for (let i = 0; i < strId.length; i++) {
        rawVal = Number(strId[i]) * ((i % 2) + 1);
        actualVal = rawVal > 9 ? (rawVal - 9) : rawVal;
        counter += actualVal;
      }
      if (counter % 10 === 0)
        return null;
      return { 'invalidId': true };
    }
    return null;

  }
}
