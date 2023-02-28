import { Injectable } from '@angular/core';
import { RestService } from '../rest.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public rest: RestService) { }
  
  getReview(p: any) { return this.rest.get('getReview', p) }
  addReview(p: any) { return this.rest.get('addReview', p) }
  updateReview(id:number, p: any) { return this.rest.get('updateReview/'+id, p) }
}
