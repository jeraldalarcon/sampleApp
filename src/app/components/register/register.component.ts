import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { UserFileService } from 'src/app/services/user-file.service';
import { Users  } from '../../././interface/users';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
  public createForm: FormGroup;
  loading = true;
  constructor(
    private userService: UserFileService,
  ) { }

  ngOnInit(): void {
    this.createForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      username: new FormControl('', [Validators.required, Validators.maxLength(60), Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')]),
      email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
      contactNumber: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    });
  }

  create() {
    this.createForm.value.id = Math.floor(Math.random() * 11);
    this.userService.create(this.createForm.value)
    .subscribe(res => {
      console.log('this is result:', res);
    });
  }

  // submitForm() {
  //   this.bugService.CreateBug(this.issueForm.value).subscribe(res => {
  //     console.log('Issue added!')
  //     this.ngZone.run(() => this.router.navigateByUrl('/issues-list'))
  //   });
  // }

}
