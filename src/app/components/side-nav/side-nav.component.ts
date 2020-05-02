import { environment } from './../../../environments/environment';
import { Component , OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  background = environment.background;
  public userName: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private auth: AuthService
  ) {

  }

  ngOnInit(): void {
      this.getUserName();
  }

  getUserName() {
    this.userName = localStorage.getItem('userName');
  }


  logout() {
    this.auth.setLogin(false);
    localStorage.clear();
    this.router.navigateByUrl('login');
  }

}
