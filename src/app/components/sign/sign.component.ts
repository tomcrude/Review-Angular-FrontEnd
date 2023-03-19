import { Component } from '@angular/core';
import { Input } from '@angular/core'
import { Subject } from 'rxjs';
import {takeUntil} from "rxjs/operators"
import { user } from 'src/app/models/user';
import { Service } from 'src/app/services/service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html'
})
export class SignComponent {

  constructor(private service:Service,private router:Router){}

  @Input() title:string = "Log in"
  @Input() title2:string = "New Here?"
  @Input() button1:string = "Sign in"
  @Input() button2:string = "Sign up"
  @Input() link:string = "../signUp"

  message:string = ""

  screen:number = window.innerWidth;

  cols:number = 8;

  repeatPass:string = ""

  onDestroy$: Subject<boolean> = new Subject()

  user:user = {
    name: "",
    pass: ""
  }

  ngOnInit(){
    if(this.screen < 1000){
      this.cols = 12
    }
  }

  send(){

    if (this.title === "Log in"){
      this.service.logIn(this.user).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {if (res.message !== "success"){this.message = res.message}else {localStorage.setItem("id",res.id);localStorage.setItem("user",res.user);this.router.navigate(["home"])}},
        error: (e:any) => {if (e){this.message = "You must complete the data."}}
      })
    }
    else {
      if (this.user.pass != this.repeatPass){ this.message = "Passwords must match."}
      else if (this.repeatPass.length < 5 || this.user.pass.length < 5 || this.user.name.length < 5 ||this.repeatPass.length > 13 || this.user.pass.length > 13 || this.user.name.length > 13){ this.message = "The password and the name cannot be less than 4 nor more than 12 characters."}
      else  
      {this.service.createUser(this.user, this.repeatPass).subscribe({
          next: (res:any) => {if (res.message !== "success"){this.message = res.message}else{this.router.navigate(["logIn"])}},
          error: (e:any) => {if (e){this.message = "You must complete the data."}}
        })}}}

    ngOnDestroy(){
      this.onDestroy$.next(true)
    }    

}
