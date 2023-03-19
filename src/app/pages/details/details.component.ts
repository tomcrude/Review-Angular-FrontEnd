import { Component } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Service } from 'src/app/services/service.service';
import { ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html'
})
export class DetailsComponent {

  constructor(private activeRoute: ActivatedRoute,private service:Service,private router:Router){}

  id:any = localStorage.getItem("id")

  screen:number = window.innerWidth;
  cols:number = 3;
  onDestroy$: Subject<boolean> = new Subject()

  routeParam:any = this.activeRoute.snapshot.paramMap.get('id');

  destroy:number = 0

  review = {
    title: "",
    des: "",
    user: 0,
    id: null,
    name: "",
    type: "gif"
  }

 List:any[] = []

  ngOnInit(){

   this.load()

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

  delet(){
    this.service.deleteReviews(this.routeParam).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if(res.message == "success"){this.router.navigate(["../home"])}},
      error: (e:any) => console.log(e)
    })
  }

  load(){
    this.service.getSingleReview(this.routeParam).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {
        this.review = res;this.review.type = "png"; this.service.getUserReviews(this.review.user, this.routeParam).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {this.List = res; if(this.List == null){this.destroy = 1}},
        error: (e:any) => {if (e){this.router.navigate(["../home"])}}
      })},
      error: (e:any) => {if (e){this.router.navigate(["../home"])}}
    })
  }

  
}
