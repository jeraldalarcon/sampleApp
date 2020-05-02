import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { UserFileService } from 'src/app/services/user-file.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userInfo = [];
  constructor(
    private userService: UserFileService,
  ) {

  }

  ngOnInit(): void {
    this.getUserInfo(localStorage.getItem('id'));
  }

  getUserInfo(id) {
    this.userService.getUsersInfo(id)
    .subscribe(
      res => {
        console.log('this is details:', res);
        this.userInfo = res;
      }
    );
  }

}
