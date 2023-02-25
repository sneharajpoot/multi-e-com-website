import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot,
    ) {
    // return true;
    var g: any = localStorage.getItem("cUserGold");
    let user: any = null;
    if (g != null) {
      let user: any = JSON.parse(g);
      return true;
    } else {
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      return false;
    }
    return false;

    try {
      if ((user != null)) {
        //     // logged in so return true
        //     if (user.PartnerId == this.global.AdminId) {
        //       this.global.isAdminSrc.next(true);
        //     } else {
        //       this.global.isAdminSrc.next(false);
        //     }
        //     this.global.LoggedUserSrc.next(user);
        //     this.global.LoggedInSrc.next(1);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      //   this.global.LoggedInSrc.next(0);
      //   this.global.redirect("login");
      //   // not logged in so redirect to login page with the return url
      //   // this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }

    // this.global.LoggedInSrc.next(0);
    // // not logged in so redirect to login page with the return url
    // this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
    return true;
  }
}
