import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap, map , retry , delay} from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Router, Route } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public msg: string;
  private _url = 'http://localhost:3000/users';
  private loggedInStatus = false;
  private status;
  private result: any  = [];
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }


  // getPosts(): Observable<IPost[]> {
  //   return this.http.get<IPost[]>(this.url).pipe(delay(1000));
  // }

  login(data: any) {
    return this.http.get<any>(this._url);
    // .subscribe(
    //   res =>{
    //   res.map(i=>{
    //       console.log('thiso is res dtat',i)
    //       if((i.userName === data.userName) && (i.password === data.password)){
    //         const TOKEN = Math.random().toString(36).replace(/[^a-z]+/g, '');
    //         localStorage.setItem('token',TOKEN);
    //         localStorage.setItem('id', i.id)
    //         localStorage.setItem('status', i.status)
    //         localStorage.setItem('userName',i.userName)
    //         this.router.navigateByUrl('/home')
    //         this.setLogin(true);
    //         this.setStatus(i.status)

    //       }
    //       else{

    //           this.msg = "Please  sign up!";
    //           console.log('234234',this.msg)
    //       }
    //     })
    //   }
    // )

  }


  setLogin(value: boolean) {
    this.loggedInStatus = value;
  }

  setStatus(value) {
    if (value === 'user') {
      this.status = false;
    }
    this.status = true;
  }

  get isStatus() {
    return this.status;
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }
}
