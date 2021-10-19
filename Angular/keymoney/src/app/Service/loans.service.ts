import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Loans } from '../Models/Loans';

@Injectable({
  providedIn: 'root'
})
export class LoansService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api";

  formData: Loans;

// ?פונקציה שמציגה רשימת הלוואות לפי משתמש שנשלח כפרמטר

  getLoansList():Observable<Loans[]>{
    return this.http.get<Loans[]>(this.APIUrl+'/Loans')
  }
  addLoans(dep:Loans){
    return this.http.post(this.APIUrl+'/Loans',dep)
  }
  deleteLo(id: string) {
    return this.http.delete(this.APIUrl + '/Loans?id=' + id);
  }
  updateLo(dep: Loans) {
    return this.http.put(this.APIUrl + '/Loans', dep)
  }
  getLoanById(id:number):Observable<Loans>{
    return this.http.get<Loans>(this.APIUrl + '/Loans?id=' + id);
  }
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  
}
