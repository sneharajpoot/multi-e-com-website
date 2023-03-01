import { Injectable } from '@angular/core';
import { RestService } from './rest.service';

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(public setup: RestService) {
  }

  Init() {

      return new Promise<void>((resolve, reject) => {
          ////do your initialisation stuff here  
          // setTimeout(() => {
          this.setup.readSetupJson().then(data => {
              // console.log('AppInitService Finished', data);
              resolve();
          });
          // }, 6000);

      });
  }
}