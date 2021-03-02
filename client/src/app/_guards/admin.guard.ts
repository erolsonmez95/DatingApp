import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../_services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private accountService:AccountService, 
    private toastr:ToastrService){

    }
  canActivate(): Observable<boolean>{
    return this.accountService.currentUser$.pipe(
      map(user =>{
        if(user.roles.includes('Moderator') ||user.roles.includes('Admin') ){
          return true;
        }
        this.toastr.error('You cannot enter this area');
        return false;
      })
    )
  }
  
}
