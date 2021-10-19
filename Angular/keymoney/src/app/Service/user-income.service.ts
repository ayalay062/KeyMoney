import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User_income } from '../Models/User_income';

@Injectable({
  providedIn: 'root'
})
export class UserUser_incomeService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api";

  getUser_incomeList():Observable<User_income[]>{
    return this.http.get<User_income[]>(this.APIUrl+'/User_income')
  }
  addUser_income(dep:User_income){
    return this.http.post(this.APIUrl+'/User_income',dep)
  }
  
}
