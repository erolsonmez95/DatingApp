import { environment } from './../../environments/environment';
import { User } from './../_models/user';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { ReplaySubject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  private currentUserSource = new BehaviorSubject<User>(undefined!);
  currentUser$= this.currentUserSource.asObservable();
 

  constructor(private http: HttpClient) { 
   }
   ngOnInit(){
    
  }
 

  
  register (model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
    map((user: User) =>{
      if(user){
        localStorage.setItem('user',JSON.stringify(user));
        this.currentUserSource.next(user);
      }
     
      return user;
    }))
  }


    login(model: any){
    return (this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.setCurrentUser(user);
          this.currentUserSource.next(user);
          
        }
        return user;
      })
    ));
  }
   setCurrentUser(user:User){
    this.currentUserSource.next(user);
  }
    logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined!);
  }
}
