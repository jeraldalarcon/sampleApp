import { Component, OnInit , Inject} from '@angular/core';
import { FormGroup , FormBuilder , FormControl, Validators} from '@angular/forms';
import { UserFileService } from 'src/app/services/user-file.service';
import { subscribeOn } from 'rxjs/internal/operators/subscribeOn';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { identifierName } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  userId: any;
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
    email: new FormControl('', [Validators.required, Validators.minLength(60)]),
    contactNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),

  });
  durationInSeconds = 5;
  constructor(
    private fb: FormBuilder,
    private userService: UserFileService,
    private auth: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    console.log('this is id:', localStorage.getItem('id'));
    this.getUserInfo(localStorage.getItem('id'));
    this.userId = localStorage.getItem('id');
  }


  getUserInfo(id) {
    this.userService.getUsersInfo(id)
    .subscribe(
      data => {
        this.userId = data.id;
        this.form.setValue({
          id: data.id,
          name: data.name,
          email: data.email,
          userName: data.userName,
          password: data.password,
          contactNumber: data.contactNumber
        });
      }
    );
  }

  update() {
    const value = this.form.value;
    this.userService.updateUser(value)
    .subscribe(
      res => {
        console.log('this is result update:', res);
        this._snackBar.openFromComponent(messageComponent, {
          duration: this.durationInSeconds * 1000,
        });
        this.router.navigateByUrl('home');
      }
    );
  }

  // delete(id:number){
  //   this.userService.deleteUser(id)
  //   .subscribe(
  //     res =>{
  //       console.log('this result:',res)
  //       this.auth.setLogin(false)
  //       localStorage.clear()
  //       this.router.navigateByUrl('login')
  //     }
  //   )
  // }

  delete(id: number) {
    console.log('this is idddd:', id);
    const dialogRef = this.dialog.open(homeDialogComponent , {
      width: '500px',
      data: {
        title: 'DELETE USERS INFORMATION',
        mode: 'delete',
        id

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}

export interface DialogData {
  userName: string;
  name: string;
  id: number;
  email: string;
  password: string;
  mode: string;
  title: string;
}
@Component({
  selector: 'home-dialog',
  templateUrl: 'homeDialog.html',
})

export class homeDialogComponent  implements OnInit {

  private dialogConfig;
  public createForm = new FormGroup({
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
    email: new FormControl('', [Validators.required, Validators.minLength(60)]),
    contactNumber: new FormControl('', [Validators.required, Validators.minLength(11)]),

  });
  public updateForm = new FormGroup({
  id: new FormControl(''),
  name: new FormControl('', [Validators.required, Validators.maxLength(60)]),
  userName: new FormControl('', [Validators.required, Validators.maxLength(60)]),
  password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
  email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
  contactNumber: new FormControl('', [Validators.required, Validators.maxLength(60)]),

});

  ListData: any[];
  constructor(
    private auth: AuthService,
    public dialogRef: MatDialogRef<homeDialogComponent>,
    private dialog: MatDialog,
    private userService: UserFileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router
  ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit(): void {
    }

    getUserInfo(id) {
      this.userService.getUsersInfo(id)
      .subscribe(data => {
        this.createForm.setValue({
          id: data.id,
          name: data.name,
          userName: data.userName,
          password: data.password,
          contactNumber: data.contactNumber,
          email: data.email
        });
      });

    }

    delete(id: number) {
      this.userService.deleteUser(id)
      .subscribe(
        res => {
          console.log('this result:', res);
          this.auth.setLogin(false);
          localStorage.clear();
          this.router.navigateByUrl('login');
          this.dialogRef.close();
        }
      );
    }



}

@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'message-snack.html',
  styles: [`
    .example-pizza-party {
      color: hotpink;
    }
  `],
})
export class messageComponent {}

