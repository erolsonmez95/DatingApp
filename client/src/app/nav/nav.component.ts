import { User } from './../_models/user';
import { AccountService } from './../_services/account.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any={};

 

  constructor(public accountService:AccountService,private router:Router,
    private toastr:ToastrService) {
   }

  ngOnInit(){
    
  }


  login() {
    this.accountService.login(this.model)
    
    .subscribe(response => {
      this.router.navigateByUrl('/members');
      this.toastr.success("Wellcome:  " + this.model.username);
    }, error => {
      console.log(error);
      this.toastr.error(error.error);
      // this.toastr.error(error.error); // This allows us to get the error message from the http response. The error is now handled in our error handling middleware on the api 
      
    })
  }


  logout(){
    this.accountService.logout();
    this.toastr.warning("Good bye:  " + this.model.username);
    this.router.navigateByUrl('/');
  }




}
