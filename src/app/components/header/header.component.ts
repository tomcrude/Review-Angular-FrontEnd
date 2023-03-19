import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  user:any = localStorage.getItem("user")

  logOut(){
    localStorage.removeItem("user");
    localStorage.removeItem("id");
  }
}
