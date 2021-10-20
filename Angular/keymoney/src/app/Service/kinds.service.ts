import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Kinds } from '../Models/Kinds';

@Injectable({
  providedIn: 'root'
})
export class KindsService {

    constructor(private http: HttpClient) {}
    readonly APIUrl = 'https://localhost:44327/api/Kinds';
  
    getKindsList(): Observable<Kinds[]> {
      return this.http.get<Kinds[]>(this.APIUrl + '/GetAll');
    }
    addKinds(dep: Kinds) {
      return this.http.post(this.APIUrl + '/AddKinds', dep);
    }
  }
  