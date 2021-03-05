import { PresenceService } from './_services/presence.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  user: User = JSON.parse(localStorage.getItem('user') || '{}');
  // Dependency injection
  constructor(public accountService: AccountService
    ,private prsence:PresenceService) {

  }
 
  ngOnInit() {
    if(this.user.userName != undefined){
    this.setCurrentUser();
    }
    
  }
  
  setCurrentUser() {
    if (this.user){
      this.accountService.setCurrentUser(this.user);
      this.prsence.createHubConnection(this.user);  
    }
   
    }
 

}