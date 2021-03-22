import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  isLoggedIn = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private loginService: LoginService,
    private router: Router,
    private breakpointObserver: BreakpointObserver) {
      this.loginService.currentUser.subscribe(currentUser => {
        this.isLoggedIn = !!currentUser;
      });
  }

  logout() {
    this.loginService.logout();
  }

  navigate(route: string) {
    this.router.navigate([route]);
  }

}
