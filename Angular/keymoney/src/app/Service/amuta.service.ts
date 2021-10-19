import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Amuta } from '../Models/Amuta';

@Injectable({
  providedIn: 'root'
})
export class AmutaService {

  constructor(private http:HttpClient) { }
  readonly APIUrl="https://localhost:44327/api";
  
  getAmutaList():Observable<Amuta[]>{
    return this.http.get<Amuta[]>(this.APIUrl+'/Amuta')
  }
  addAmuta(dep:Amuta):Observable<Amuta>{
    return this.http.post<Amuta>(this.APIUrl+'/Amuta',dep)
  }
}