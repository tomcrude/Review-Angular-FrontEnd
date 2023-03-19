import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { review, user } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class Service {

  constructor(private http:HttpClient) {}

  url:string = "https://review-spring-boot-backend-production.up.railway.app/api"
  
  test(){
    return this.http.get(`${this.url}/tete`)
 }

   createUser(data:user,pass:any){
      return this.http.post(`${this.url}/create/${pass}`,data)
   }

   logIn(data:user){
    return this.http.post(`${this.url}/logIn`,data)
  }

  createReview(data:review, img:any){
    return this.http.post(`${this.url}/review/create/${data.title}/${data.des}/${localStorage.getItem("id")}`,img)
  }

  getReviews(){
    return this.http.get(`${this.url}/get/reviews`)
  }

  getSingleReview(id:Number){
    return this.http.get(`${this.url}/get/review/${id}`)
  }

  getUserReviews(id:Number,reviewId:Number){
    return this.http.get(`${this.url}/get/user/reviews/${id}/${reviewId}`)
  }
  
  deleteReviews(id:Number){
    return this.http.delete(`${this.url}/delete/${id}`)
  }

  editReview(data:review, img:any, id:any){
    return this.http.put(`${this.url}/edit/review/${data.title}/${data.des}/${id}/${localStorage.getItem("id")}`,img)
  }
}
