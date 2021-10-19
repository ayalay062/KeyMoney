import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Expenses } from '../Models/Expenses';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api";

  getExpensesList():Observable<Expenses[]>{
    return this.http.get<Expenses[]>(this.APIUrl+'/Expenses')
  }
  addExpenses(dep:Expenses){
    return this.http.post(this.APIUrl+'/Expenses',dep)
  }
  
}
