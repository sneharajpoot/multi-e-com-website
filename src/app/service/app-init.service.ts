

import { Injectable } from '@angular/core';
import { SetupService } from './setup.service';

@Injectable()
export class AppInitService {

    constructor(public setup: SetupService) {
    }

    Init() {

        return new Promise<void>((resolve, reject) => {
            console.log("AppInitService.init() called");
            ////do your initialisation stuff here  
            // setTimeout(() => {
            // this.setup.readSetupJson().then((data:any) => {
            //     console.log('AppInitService Finished', data);
            //     resolve();
            // });
            // }, 6000);

        });
    }
}