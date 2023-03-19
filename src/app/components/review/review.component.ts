import { Component } from '@angular/core';
import { Input } from '@angular/core'
import {Router} from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html'
})
export class ReviewComponent {

  constructor(private router:Router){}

  @Input() title:string = ""
  @Input() des:string = ""
  @Input() img:string = ""
  @Input() id:string = ""

  click(){
    window.scroll({top: 0})
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([`../home/details/${this.id}`]);
  });
      
  
  }

}
