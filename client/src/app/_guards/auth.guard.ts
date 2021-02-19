import { User } from './../_models/user';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private currentUser$: Observable<User>;
    constructor(private accountService:AccountService ,private toastr:ToastrService) {
      this.currentUser$ = this.accountService.currentUser$;
  }



  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe( 
      map(user => {
        if(user) {
          return true;
        }
        this.toastr.error('Not authorized!'); 
        return false;          
      })
    );
  }    

  
}
