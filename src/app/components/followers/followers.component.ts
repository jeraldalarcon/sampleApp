import { Component, OnInit } from '@angular/core';
import { FollowersService } from 'src/app/services/followers.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { combineLatest } from 'rxjs/internal/operators/combineLatest';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
  followers: any =  [];
  constructor(private followerService: FollowersService, private ActiveRoute: ActivatedRoute) { }

  ngOnInit(): void {

    // Observable.combineLatest(
    //   this.ActiveRoute.paramMap,
    //   this.ActiveRoute.queryParamMap
    // )
    // .switchMap(combined => {
    //   let id = combined[0].get('id');
    //   let page = combined[1].get('page');

    //   return this.followerService.getAllFollowers();
    // })
    // .subscribe(followers => this.followers = followers);

    this.ActiveRoute.paramMap.subscribe(
      response => {
        const id = response.get('id');
      }
    );

    this.ActiveRoute.queryParamMap.subscribe(
      response => {
        const page = response.get('page');
      }
    );

    this.followerService.getAllFollowers().subscribe(
      response => {
        this.followers = response;
      }
    );
  }

}
