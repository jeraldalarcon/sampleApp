import { Injectable } from '@angular/core';
import { Users  } from '.././././interface/users';
import { window } from 'rxjs/internal/operators/window';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map , retry , delay} from 'rxjs/operators';
import { Observable, throwError , Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserFileService {

  _url = 'http://localhost:3000/users';
  users: any = [];
  constructor(private http: HttpClient) { }

  private _refreshUsersList = new Subject<void>();

  get refreshUserlist() {
    return this._refreshUsersList;
  }

// Http Headers
  headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
  httpOptions = {
    headers: this.headers
  };

 // GET
  getUsers(): any {
     return this.http.get(this._url)
     .pipe(delay(1000));
  }

  // POST
  create(users: any): Observable<any> {
      // return this.http.post<any>(this._url, JSON.stringify(users), this.httpOptions)
      return this.http.post<any>(this._url, users, this.httpOptions)
      .pipe(
        tap(
          data => {
            this._refreshUsersList.next();
          }
        ),
        catchError(this.errorHandl)
      );
  }

  // DELETE
  deleteUser(id: number): any {
    const new_url = `${this._url}/${id}`;
    return this.http.delete<any>(new_url, this.httpOptions)
    .pipe(
      tap(
        data =>
         console.log('service response:', data),
        ),
      catchError(this.errorHandl)
    );
  }

  // PUT
  updateUser(user: any): Observable<any> {
    const new_url = `${this._url}/${user.id}`;
    return this.http.put<any>(new_url, user, this.httpOptions)
    .pipe(
      map(() => user),
      catchError(this.handleError)
    );
  }

  getUsersInfo(id: number): Observable<any> {
    const url = `${this._url}/${id}`;
    return this.http.get<any>(url).pipe(
    catchError(this.handleError)
    );
  }

  // checkUserName(UserData: string):void{
  //   console.log('this is username:',UserData)
  //   return this.getUsers<any>()
  //   .pipe(
  //     catchError(this.handleError)
  //   )
  // }




  // Error handling
  errorHandl(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log('23749824939', errorMessage);
     return throwError(errorMessage);
  }


  private handleError(error: any) {
    console.error('000000000', error);                                       // Created a function to handle and log errors, in case
    return throwError(error);
  }

}




