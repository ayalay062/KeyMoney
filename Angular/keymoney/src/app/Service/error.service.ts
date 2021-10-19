import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor() { }

  handleError(err: HttpErrorResponse) {
    if (!err.error || !err.error.error) {
      return throwError(this.errorMsgs['UNKNOWN'])
    } else {
      return throwError(this.errorMsgs['err.error.error.message'])
    }
  }

  errorMsgs = {
    'UNKNOWN': "קרתה שגיאה לא ידועה",
    'EMAIL_EXISTS': "חשבון המייל הזה כבר קיים. אנא נסה חשבון אחר",
    'EMAIL_NOT_FOUND': "",
    'INVALID_PASSWORD': "סיסמה לא נכונה",
  }
}
