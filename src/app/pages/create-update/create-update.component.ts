import { Component } from '@angular/core';
import { Input } from '@angular/core'
import { ActivatedRoute} from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { review } from 'src/app/models/user';
import { Service } from 'src/app/services/service.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html'
})
export class CreateUpdateComponent {

  constructor(private activeRoute: ActivatedRoute,private service:Service,private router:Router){}

  @Input() title:string = "Create"
  @Input() button:string = "Upload"

  message:string = ""
  request:boolean = false

  onDestroy$: Subject<boolean> = new Subject()

  id:any = localStorage.getItem("id")

  review:review = {
    title: "",
    des: "",
    img: null
  }

  routeParam:any = this.activeRoute.snapshot.paramMap.get('id');

  ngOnInit(){
    if (this.routeParam != 0){
      this.title = "edit"
      this.button = "Save"
     

      this.service.getSingleReview(this.routeParam).pipe(takeUntil(this.onDestroy$)).subscribe({
        next: (res:any) => {this.review = res; if (res.user != this.id){this.router.navigate(["../home"])}},
        error: (e:any) => console.log(e)
      })
    }
  
  }

  img(event:any):any{
    this.review.img = event.target.files[0]
  }

  uploadEdit(){

    

    if(this.review.title.length < 5 || this.review.title.length > 21){this.message = "The title cannot be less than 4 nor more than 20 characters."}
    else if(this.review.des.length < 11 || this.review.des.length > 101){this.message = "The description cannot be less than 10 nor more than 100 characters."}
    else if(this.review.img == null || this.review.img == undefined){this.message = "You must upload an image."}
    else 
    {
      this.request = true
      this.message = ""
      if (this.routeParam == 0){
     
      const formdata = new FormData()
      formdata.append("image", this.review.img)

      this.service.createReview(this.review, formdata).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if (res.message === "success"){this.router.navigate([`../home/details/${res.id}`])}else {this.message = res.message}},
      error: (e:any) => {if (e){this.message = "The data entered is incorrect."}}
    })
    }
    else {
      const formdata = new FormData()
      formdata.append("image", this.review.img)

      this.service.editReview(this.review, formdata,this.routeParam).pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (res:any) => {if (res.message === "success"){ this.router.navigate([`../home/details/${res.id}`])}else {this.message = res.message}},
      error: (e:any) => this.message = "The data entered is incorrect."
    })

    }
  }
  
  
  }

  ngOnDestroy(){
    this.onDestroy$.next(true)
  }    


}
