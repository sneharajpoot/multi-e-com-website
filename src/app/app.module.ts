import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemCardComponent } from './component/item-card/item-card.component';
import { SliderComponent } from './component/slider/slider.component';
import { RestService } from './service/rest.service';
import { GlobalService } from './service/global.service';
import { NotifierModule, NotifierOptions } from 'angular-notifier';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, SPINNER } from 'ngx-ui-loader';
import { AppInitService } from './service/app-init.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export function initializeApp1(appInitService: AppInitService) {
  return (): Promise<any> => {
    return appInitService.Init();
  }
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  // bgsColor: "red",
  // bgsPosition: POSITION.bottomCenter,
  // bgsSize: 1,
  // bgsOpacity: 0,
  // bgsType: SPINNER.rectangleBounce, // background spinner type
  // fgsType: SPINNER.foldingCube, // foreground spinner type
  // pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  // pbThickness: 4, // progress bar thickness

  bgsColor: "red",
  bgsOpacity: 0.5,
  bgsPosition: "bottom-left",
  bgsSize: 30,
  bgsType: "folding-cube",      // background spinner type
  fgsType: SPINNER.foldingCube, // foreground spinner type
  blur: 5,
  delay: 0,
  fastFadeOut: true,
  fgsColor: "rgb(239 96 96)",
  fgsPosition: "center-center",
  fgsSize: 24,
  gap: 24,
  logoPosition: "center-center",
  logoSize: 90,
  logoUrl: "",
  masterLoaderId: "master",
  overlayBorderRadius: "0",
  overlayColor: "rgba(40, 40, 40, 0.8)",
  pbColor: "red",
  pbDirection: "ltr",
  pbThickness: 3,
  hasProgressBar: true,
  text: "",
  textColor: "gray",
  textPosition: "center-center",
  maxTime: -1,
  minTime: 300
};
const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12
    },
    vertical: {
      position: "top",
      distance: 12,
      gap: 10
    }
  },
  theme: "material",
  behaviour: {
    autoHide: 3000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease"
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50
    },
    shift: {
      speed: 300,
      easing: "ease"
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent,
    ItemCardComponent,
    SliderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    NotifierModule.withConfig(customNotifierOptions),
    // NgxUiLoaderModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    NgxUiLoaderRouterModule,

  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    RestService, GlobalService,
    // { provide: APP_INITIALIZER, useFactory: initializeApp1, deps: [AppInitService], multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
