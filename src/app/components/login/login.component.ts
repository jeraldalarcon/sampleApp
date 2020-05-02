
import { Input, Component, Output, EventEmitter , OnInit  , Inject } from '@angular/core';
import { FormGroup, FormControl, Validators , AbstractControl, ValidatorFn, FormBuilder} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UserFileService } from 'src/app/services/user-file.service';
import { Users  } from '../../././interface/users';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private userService: UserFileService,
    private router: Router,
  ) {

  }
  showSpinner = true;
  public msg: string;

  form = this.fb.group({
      userName: [
                 null,
                  Validators.compose([
                    Validators.required,
                    // Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$'),
                  ])
      ],
      password: [
                  null,
                  Validators.compose([
                    Validators.required,
                  ])
      ],
    });


  ngOnInit(): void {}

  login() {
  this.auth.login(this.form.value)
  .subscribe(
    res => {
    res.map(i => {
      const x = this.form.value;
      console.log('thiso is res dtat', x.userName, x.password);
      if ((i.userName === x.userName) && (i.password === x.password)) {
          const TOKEN = Math.random().toString(36).replace(/[^a-z]+/g, '');
          localStorage.setItem('token', TOKEN);
          localStorage.setItem('id', i.id);
          localStorage.setItem('status', i.status);
          localStorage.setItem('userName', i.userName);
          this.router.navigateByUrl('/home');
          this.auth.setLogin(true);
          this.auth.setStatus(i.status);

        } else {
          this.msg = 'No User Name found,Please  sign up!';
        }
      });
    }
  );

  }

  openDialog(): void {
    const dialogRef = this.dialog.open(registerDialogComponent , {
      width: '500px',
      data: {
        title: 'REGISTER',
        mode: 'create',
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


}


function ValidatePassword(control: AbstractControl): {[key: string]: any} | null  {
  if (control.value && control.value.length != 10) {
    console.log('this is contorl:111111');
    return { passswordInvalid: true };
  }
  console.log('this is contorl:2222');
  return null;
}



export interface DialogData {
  userName: string;
  name: string;
  id: number;
  email: string;
  password: string;
  mode: string;
  title: string;
  contactNumber: number;
}

@Component({
  selector: 'login-dialog',
  templateUrl: 'loginDialog.html',
})


export class registerDialogComponent  implements OnInit {
  message: string;
  status: string;
  private dialogConfig;
  public errorMsg: string;
  public form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(6)]),
    userName: new FormControl('', [
                                    Validators.required, Validators.minLength(6),
                                    Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')
                                  ]),
    password: new FormControl('', [
                                    Validators.required, Validators.minLength(8),
                                    Validators.pattern('^(?=.*[0-9]+.*)(?=.*[a-zA-Z]+.*)[0-9a-zA-Z]{6,}$')
                                  ]),
    email: new FormControl('', [Validators.required, Validators.minLength(10)]),
    contactNumber: new FormControl('', [
                                        Validators.required,
                                        Validators.pattern('[0-9]{11}'),
                                        Validators.minLength(11),
                                      ]),

  });

  ListData: any[];
  constructor(
    public dialogRef: MatDialogRef<registerDialogComponent >,
    private dialog: MatDialog,
    private userService: UserFileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit(): void {
      this.dialogConfig = {
        height: '500px',
        width: '400px',
        disableClose: true,
        data: {}
      };

    }

    create(): void {
      console.log('this is createform:', this.form.value);
      const i = Math.floor(Math.random() * 10) + 1;
      this.form.value.id = i;
      this.userService.create(this.form.value)
      .subscribe(
        res => {
        console.log('this is result:', res);
        this.dialogRef.close();
        },
        error => this.errorMsg = error

    );
    }


    checkUserName(event) {
       const inputName = event.target.value;
       this.userService.getUsers()
      .subscribe(
            i => {
              if (i.find(x => x.userName === inputName)) {
                  this.message = 'This User name is not Available!';
                  this.status =  '1';
              }
            }
      );
    }



}





