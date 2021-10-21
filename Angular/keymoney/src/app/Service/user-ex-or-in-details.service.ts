import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User_expense } from '../Models/User_expense';

@Injectable({
  providedIn: 'root'
})
export class UserExOrInDetailsService {

  readonly APIUrl = "https://localhost:44327/api/User_expense";
  expenseDetails: User_expense;

  constructor(private http: HttpClient) { }

  getExpenseList(year:number, month:number,userId:string): Observable<User_expense[]> {
    return this.http.get<User_expense[]>(this.APIUrl + '/GetAllByUserDate/'+year+'/'+month+'/'+ userId)
  }
  getById(id: number): Observable<User_expense> {
    return this.http.get<User_expense>(this.APIUrl + '/GetById/' + id)
  }
  addExp(dep: User_expense) {
    return this.http.post<User_expense>(this.APIUrl + '/AddUserExpense', dep)
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
  //למחוק הוצאה לפי id של משתמש
  deleteExp(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteUserExpense/' + id);
  }
  updateExp(dep: User_expense) {
    return this.http.post(this.APIUrl + '/UpdateUserExpense', dep)
  }
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  
}
