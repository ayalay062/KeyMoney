import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Email } from '../Models/Email';

@Injectable({
  providedIn: 'root'
})
export class EmailServiceService {
  readonly APIUrl="https://localhost:44327/api/Email/";
  
  constructor(private httpCilent: HttpClient) { }
  sendEmail(emailData: Email): Observable<any>{
    return this.httpCilent.post(this.APIUrl + 'sendEmail', emailData)
  }
}
