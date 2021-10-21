import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User_income } from '../Models/User_income';

@Injectable({
  providedIn: 'root'
})
export class UserUser_incomeService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api/User_income";
  getUser_incomeList(year:number, month:number,userId:string): Observable<User_income[]> {
    return this.http.get<User_income[]>(this.APIUrl + '/GetAllByUserDate/'+year+'/'+month+'/'+ userId)
  }
  getById(id: number): Observable<User_income> {
    return this.http.get<User_income>(this.APIUrl + '/GetById/' + id)
  }
  addUser_income(dep:User_income){
    return this.http.post(this.APIUrl+'/AddUserIncome',dep)
  }
  updateUser_income(dep:User_income){
    return this.http.post(this.APIUrl+'/UpdateUserIncome',dep)
  }
  deleteUserIncome(id:number){
    return this.http.delete(this.APIUrl+'/DeleteUserIncome/'+id)
  } 
}
