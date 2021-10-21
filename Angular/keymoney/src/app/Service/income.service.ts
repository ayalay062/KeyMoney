import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Income } from '../Models/Income';

@Injectable({
  providedIn: 'root',
})
export class IncomeService {
  constructor(private http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44327/api/Income';

  getIncomeList(): Observable<Income[]> {
    return this.http.get<Income[]>(this.APIUrl + '/GetAll');
  }
  addIncome(dep: Income) {
    return this.http.post(this.APIUrl + '/Income', dep);
  }
}
