import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User_expense } from '../Models/User_expense';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  constructor(private http: HttpClient) { }
  readonly APIUrl = "https://localhost:44327/api";

  //כמה הוצאות לאדם לפי תחום
  userExpenseByCategory(id_user: string): Observable<User_expense> {
    return this.http.get<User_expense>(this.APIUrl + '/User_expense?id_user=' + id_user + '&d=true');
  }

  // //כמה חולים לפי מוצא
  userExpByCategory(id_user: string): Observable<number[]> {
    return this.http.get<number[]>(this.APIUrl + '/Graph?id_user=' + id_user + '&d=true');
  }

}
