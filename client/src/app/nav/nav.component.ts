import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any={};
 

  constructor(public accountService:AccountService) { }

  ngOnInit(){
    
  }


  login() {
    this.accountService.login(this.model)
    
    .subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
      // this.toastr.error(error.error); // This allows us to get the error message from the http response. The error is now handled in our error handling middleware on the api 
      
    })
  }


  logout(){
    this.accountService.logout();
  }




}
