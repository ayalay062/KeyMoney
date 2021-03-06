import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { User_expense } from '../Models/User_expense';

@Injectable({
  providedIn: 'root'
})
export class UserExpenseService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api";
  expenseDetails: User_expense;

  getUser_expenseList():Observable<User_expense[]>{
    return this.http.get<User_expense[]>(this.APIUrl+'/User_expense')
  }

  addUser_expense(dep:User_expense){
    return this.http.post(this.APIUrl+'/User_expense',dep)
  }

  getExpenseList(): Observable<User_expense[]> {
    return this.http.get<User_expense[]>(this.APIUrl + '/')
  }

  getUserEx_details(id: string): Observable<User_expense> {
    return this.http.get<User_expense>(this.APIUrl + '/User_expense?id=' + id)
  }

  addExp(dep: User_expense) {
    return this.http.post(this.APIUrl + '/', dep)
  }

  filter(filterBy: string) {
    this._listners.next(filterBy);
  }

  //למחוק הוצאה לפי id של משתמש
  deleteExp(id: number) {
    return this.http.delete(this.APIUrl + '/' + id);
  }
  updateExp(dep: User_expense) {
    return this.http.post(this.APIUrl + '', dep)
  }
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  
}
