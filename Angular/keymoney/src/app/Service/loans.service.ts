import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Loans } from '../Models/Loans';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  constructor(private http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44327/api/Loans';

  formData: Loans;

  // ?פונקציה שמציגה רשימת הלוואות לפי משתמש שנשלח כפרמטר

  getLoansList(): Observable<Loans[]> {
    return this.http.get<Loans[]>(this.APIUrl + '/GetAll');
  }
  addLoans(dep: Loans) {
    return this.http.post(this.APIUrl + '/AddLoans', dep);
  }
  deleteLo(id: string) {
    return this.http.delete(this.APIUrl + '/DeleteLoans/' + id);
  }
  updateLo(dep: Loans) {
    return this.http.post(this.APIUrl + '/UpdateLoans', dep);
  }
  getLoansByUserId(userid: string): Observable<Loans[]> {
    return this.http.get<Loans[]>(this.APIUrl + '/GetByUserId/' + userid);
  }
  calcLoansByUserIdMonthYear(userid: string,  month:number,  year:number): Observable<Loans[]> {
    return this.http.get<Loans[]>(this.APIUrl + '/CalculateLoanByMonth/' + userid + '/'+ month+'/'+ year);
  }
  getLoanById(id: number): Observable<Loans> {
    return this.http.get<Loans>(this.APIUrl + '/GetById/' + id);
  }
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
}
