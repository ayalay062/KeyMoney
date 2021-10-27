import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Amuta_deposits } from '../Models/Amuta_deposits';

@Injectable({
  providedIn: 'root',
})
export class AmutaDepositService {
  constructor(private http: HttpClient) {}
  readonly APIUrl = 'https://localhost:44327/api/Amuta_deposits';

  getAmuta_depositsList(): Observable<Amuta_deposits[]> {
    return this.http.get<Amuta_deposits[]>(this.APIUrl + '/Amuta_deposits');
  }

  getAmutaDepositById(id:number): Observable<Amuta_deposits> {
    return this.http.get<Amuta_deposits>(this.APIUrl + '/GetById/'+id);
  }
  addAmuta_deposits(dep: Amuta_deposits) {
    return this.http.post(this.APIUrl + '/AddAmutaDeposits', dep);
  }
  updateAmuta_deposits(dep: Amuta_deposits) {
    return this.http.post(this.APIUrl + '/UpdateAmutaDeposits', dep);
  }

  deleteAmutaDep(id: number) {
    return this.http.delete(this.APIUrl + '/DeleteAmutaDeposits/'+id);
  }
  getAmutaDepByUserIdMonthYear(
    userId: string,
    year: number,
    month: number
  ): Observable<Amuta_deposits[]> {
    return this.http.get<Amuta_deposits[]>(
      this.APIUrl + '/GetAllByUserDate/' + year + '/' + month + '/' + userId
    );
  }
}
