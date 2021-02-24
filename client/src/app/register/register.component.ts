import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector:'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
 
  //Input user for get users from Parent to child
  @Output() cancelRegister =new EventEmitter();
  registerForm !: FormGroup;
  maxDate: Date;
  validationErrors: string[]=[];

  constructor(private accountService:AccountService,
    private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate= new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear()-18);
    // to be able to register for 18+ years old 
  }


  initializeForm(){
    this.registerForm =this.fb.group(
    {
      gender: ['female'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password:['', [Validators.required, Validators.minLength(4),Validators.maxLength(10)]],
      confirmPassword: ['',[Validators.required, this.matchValues('password')]]
    })
    this.registerForm.controls.password.valueChanges.subscribe(()=>{
    this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
    //above code to check if password checked, then it's again check with confirm password.
  }





  matchValues(matchTo:string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = control?.parent?.controls as any;
      return (forbidden) 
        ? (control?.value === forbidden[matchTo]?.value) ? null : {isMatching: true}
        : null;
    }
  }





  register(){
    
    this.accountService.register(this.registerForm.value).subscribe(response =>{
    this.router.navigateByUrl('/members');   
    this.cancel();
    },error=>{
      this.validationErrors=error;
    })
    
  }

  cancel(){
    this.cancelRegister.emit(false);
    // this used for data transfer child to parent
  }

}
