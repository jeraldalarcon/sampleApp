import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';


@Injectable({
  providedIn: 'root'
})
export class FollowersService {
  private readonly _url = 'https://api.github.com/users/mosh-hamedani/followers';
  constructor(private http: HttpClient) { }

  getAllFollowers() {
    return this.http.get(this._url);
    // .pipe(
    //   map(response =>{response})
    // )
  }
}
