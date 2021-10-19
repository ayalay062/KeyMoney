import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Amuta_deposits } from '../Models/Amuta_deposits';

@Injectable({
  providedIn: 'root'
})
export class AmutaDepositService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api";

  getAmuta_depositsList():Observable<Amuta_deposits[]>{
    return this.http.get<Amuta_deposits[]>(this.APIUrl+'/Amuta_deposits')
  }
  addAmuta_deposits(dep:Amuta_deposits){
    return this.http.post(this.APIUrl+'/Amuta_deposits',dep)
  }
  
}
