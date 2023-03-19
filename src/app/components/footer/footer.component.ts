import { Component } from '@angular/core';
import { Input } from '@angular/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

  date:any = new Date().getFullYear();


}
