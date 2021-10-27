import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, Subject } from 'rxjs';
import { User } from '../Models/User';
import { ErrorService } from './error.service';
import { catchError } from 'rxjs/operators';
import { Email } from '../Models/Email';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly APIUrl = 'https://localhost:44327/api';
  formData: User;
  public user = new BehaviorSubject<User>(null);
  errorData = {};

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
    private router: Router,
    private _errService: ErrorService
  ) {}

  contactForm(formData: Email) {
    return this.http
      .post<Email>(this.APIUrl + '', formData, this.httpOptions)
      .pipe(
        catchError((err) => {
          this.handleError(err);
          return EMPTY;
        })
      );
  }
  calculateSum(
    year: number,
    month: number,
    userId: string
  ): Observable<number> {
    return this.http.get<number>(
      this.APIUrl + '/User/calculateSum/' + year + '/' + month + '/' + userId
    );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occured:', error.error.message);
    } else {
      console.error(
        'Backend return code $(erroer.status),' + ',body was:$(erroer.status)'
      );
    }
  }

  signIn(email, password) {}
  signOut() {
    this.user.next(null);
    this.router.navigate(['']);
    // ??? למה הפונקציה? צריכה לקבל פרמטר- איזה?
    // localStorage.removeItem();
  }
  setU(user: User) {
    this.user.next(user);
    var us = JSON.stringify(user);
    localStorage.setItem('user', us);
  }
  getU(): User {
    var us = <User>JSON.parse(localStorage.getItem('user'));
    return this.user.value || us;
  }
  deleteU() {
    this.user.next(null);
  }
  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.APIUrl + '/User/GetAll');
  }
  addUser(dep: User) {
    return this.http.post<User>(this.APIUrl + '/User/AddUser', dep);
  }
  deleteUser(id: number) {
    return this.http.delete(this.APIUrl + '/User/' + id);
  }
  updateUser(dep: User) {
    return this.http.post(this.APIUrl + 'User', dep);
  }
  getAuthoById(id: number): Observable<User> {
    return this.http.get<User>(this.APIUrl + '/User?id=' + id);
  }
  approveUser(id: number) {
    console.log(id);
    return this.http.post(this.APIUrl + '/User/ApproveUser', { id: id });
  }
  private _listners = new Subject<any>();
  listen(): Observable<any> {
    return this._listners.asObservable();
  }
  filter(filterBy: string) {
    this._listners.next(filterBy);
  }
  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(this.APIUrl + '/User/Login', {
      id_user: password,
      email,
    });
  }
  forgetPassword(data) {
    return this.http
      .post<any>(
        'http://identitytoolkit.googleapis.com/v1/accounts:send0obCode?key=${config.API_KEY}',
        {
          requestType: 'PASSWORD_RESET',
          email: data.email,
        }
      )
      .pipe(
        catchError((err) => {
          return this._errService.handleError(err);
        })
      );
  }
  registerUser(new_user: User) {
    const body: User = {
      name_user: new_user.name_user,
      tel: new_user.tel,
      id_user: new_user.id_user,
      misgeret: new_user.misgeret,
      email: new_user.email,
      is_admin: false,
      is_disabled: false

    };
    return this.http.post(this.APIUrl + '/api/User/Register', body);
  }
}
