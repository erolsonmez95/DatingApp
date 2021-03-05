import { PresenceService } from './presence.service';
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
 

  constructor(private http: HttpClient, 
    private presence:PresenceService) { 
   }
   ngOnInit(){
    
  }
 

  
  register (model:any){
    return this.http.post<User>(this.baseUrl+'account/register',model).pipe(
    map((user: User) =>{
      if(user){
        this.setCurrentUser(user);
        this.presence.createHubConnection(user);
      }
     
      return user;
    }))
  }


    login(model: any){
    return (this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if(user) {
          this.setCurrentUser(user);
          this.presence.createHubConnection(user);
        }
        return user;
      })
    ));
  }
   setCurrentUser(user:User){
    user.roles=[];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles=roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }
    logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(undefined!);
    this.presence.stopHubConnection();
  }


  getDecodedToken(token){
    return JSON.parse(atob(token.split('.')[1]));
  }
}
