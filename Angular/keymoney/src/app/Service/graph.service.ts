import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User_expense } from '../Models/User_expense';

@Injectable({
  providedIn: 'root' // It will inject this provider at the root level of the application so it can be accessed anywhere.
})
export class GraphService {
  constructor(private http: HttpClient) { }
  readonly APIUrl = "https://localhost:44327/api";

  GetMonthsByYear(id_user: string,  year:number): Observable<string[]> {
    return this.http.get<string[]>(this.APIUrl +  '/Graph/GetMonthsByYear/' + id_user + '/'+year);
  }


  userExpByCategory(id_user: string): Observable<number[]> {
    return this.http.get<number[]>(this.APIUrl + '/Graph/GetCategory/' + id_user + '/true');
  }

}
