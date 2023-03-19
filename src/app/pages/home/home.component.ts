import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Service } from 'src/app/services/service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor(private service:Service){}
  
  screen:number = window.innerWidth;
  onDestroy$: Subject<boolean> = new Subject()
  cols:number = 3;

  list:any[] = []

  ngOnInit(){

    this.service.getReviews().pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {this.list = res},
      error: (e:any) => console.log(e)
    })

    if(this.screen < 1576){
      this.cols = 4
    }

    if(this.screen < 1224){
      this.cols = 6
    }

    if(this.screen < 780){
      this.cols = 12
    }

  }

  ngOnDestroy(){
    this.onDestroy$.next(true)
  }  

}
