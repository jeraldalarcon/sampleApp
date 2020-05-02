import { Component, OnInit , Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormGroup, FormControl , Validators} from '@angular/forms';
import { UserFileService } from 'src/app/services/user-file.service';
import { Users  } from '../../././interface/users';
import { Router } from '@angular/router';
import { MatTableDataSource} from '@angular/material/table';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'userName', 'email', 'contactNumber', 'password', 'actions'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  usersList: any = [];
  private updateForm: FormGroup;


  constructor(
    public dialog: MatDialog,
    private userService: UserFileService,
    private router: Router,
  ) { }

  data: Users [] = this.userService.getUsers();

  openDialog(): void {
    const dialogRef = this.dialog.open(listDialogComponent , {
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

  ngOnInit(): void {


   this.userService.getUsers()
   .subscribe(
     res => {
       console.log('sdjf;sdkljf:', res);
     }
   );
  }

  edit(id: number): void {
      const dialogRef = this.dialog.open(listDialogComponent , {
        width: '500px',
        data: {
          title: 'UPDATE USERS INFORMATION',
          mode: 'edit',
          id

        }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });
  }

  goToRegister() {
    this.router.navigateByUrl('register');
  }


  delete(id: number) {
    const dialogRef = this.dialog.open(listDialogComponent , {
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
  selector: 'list-dialog',
  templateUrl: 'listDialog.html',
})

export class listDialogComponent  implements OnInit {

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
    public dialogRef: MatDialogRef<listDialogComponent >,
    private dialog: MatDialog,
    private userService: UserFileService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
    private auth: AuthService
  ) {}

    onNoClick(): void {
      this.dialogRef.close();
    }

    ngOnInit(): void {
      console.log('thsi si id:', this.data);
      this.dialogConfig = {
        height: '500px',
        width: '400px',
        disableClose: true,
        data: {}
      };

      if (this.data.mode === 'edit') {
        this.getUserInfo(this.data.id);
      }

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

    create(): void {
      console.log('this is createform:', this.createForm.value);
      const i = Math.floor(Math.random() * 10) + 1;
      this.createForm.value.id = i;
      this.userService.create(this.createForm.value)
      .subscribe(res => {
        console.log('this is result:', res);
        this.dialogRef.close();
      });
    }


    update() {
      const value = this.createForm.value;
      this.userService.updateUser(value)
      .subscribe(
        res => {
          console.log('this is result update:', res);
        }
      );
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
