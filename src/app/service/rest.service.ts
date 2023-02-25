import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
// import { Http } from "@angular/http";
// import "rxjs/add/operator/map";
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
// import { ConfigService } from "../services/config.service";
// import { GlobalService } from "../services/global.service";
// import { resolve } from "url"; 
// import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
// import * as setupe from '../../assets/setup.json';

@Injectable()
export class RestService {


  session: any = {
    xid: "",
    token: "",
    type: 1
  }

  config: any = {
    Condition: "",
    Type: "MT5",
    AppName: '',
    PrimaryUrl: 'http://localhost:8082',
    SecondaryUrl: '',
    PHPURL: '',
    Referal: '',
    ImgUrl: 'http://localhost:8082',
    verifyLink: '',
    AutoLogin:'',
    LeverageList: '',
    mailerCode:[],
    BASECURRENCY:"USD",
    BASECURRENCYSYMBOL:"$"
  };
  // setupConf: any = (setupe as any).default;

  constructor(public http: HttpClient,
    public router: Router,
  ) {


  }


  redirect(url: string, params = null) {
    if (params == null) {
      this.router.navigate([url]);
    } else {
      this.router.navigate([url, params]);
    }
  }

  readJSON(param: any) {
    try {
      return this.http.get<any>('./assets/' + param);
    } catch (e) {
      console.log(e);
      return e;
    }
  }



  readSetupJson() {
    return new Promise(resolve => {
      try {
        this.http.get<any>("./assets/setup.json").subscribe(
          (data: any) => {

            this.config = {
              AppName: data.AppName,
              PrimaryUrl: data.PrimaryUrl,
              SecondaryUrl: data.SecondaryUrl,
              PHPURL: data.PHPURL,
              Referal: data.Referal,
              ImgUrl: data.ImgUrl,
              verifyLink: data.verifyLink,
              AutoLogin: data.AutoLogin,
              LeverageList: data.LeverageList,
    
              mailerCode:  data.mailerCode,
              BASECURRENCY:  data.BASECURRENCY,
              BASECURRENCYSYMBOL:  data.BASECURRENCYSYMBOL,
            };

            resolve(true);
          },
          err => {
            console.error("Initilisation Failed", err);
            resolve(null);
          }
        );
      } catch (e) {
        console.error("Error", e);
        resolve(null);
      }
    });
  }
  GetMethod(param: string) {
    return this.http.get(param);
  }

  get(endPointg: string, params?: any, optn?: any) {


    let headers;
    if (this.session)
      headers = new HttpHeaders().set('x-id', String(this.session.xid)).set('x-token', String(this.session.token)).set('type', String(this.session.type));

    console.log("headers", headers)
    if (!optn) {
      optn = { params: new HttpParams() };
    }
    let p = [];
    let newParam;
    if (params) {
      for (let k in params) {
        let str = k + '=' + params[k];
        p.push(str);
      }
      newParam = p.join('&');
    }
    // try {
    return this.http.get<any>(
      this.config.PrimaryUrl + '/' + endPointg + '?' + newParam, { headers: headers }
    ).pipe(
      catchError((err) => {
        console.error("status :--------------- " + err.status);
        if (err.status == 401) {
          this.redirect("/login");
        }

        return (err);    //Rethrow it back to component
      })
    );
    // } catch (e) {
    //   console.log(e);
    // }
  }

  post(endPointg: string, params?: any, optn?: any) {



    let headers;

    if (this.session)
      headers = new HttpHeaders().set('x-id', String(this.session.xid)).set('x-token', String(this.session.token)).set('type', String(this.session.type));


    console.log("headers post", headers)

    if (!optn) {
      optn = { params: new HttpParams() };
    }
    // try {
    // return this.http.post<any>(this.config.PrimaryUrl + '/' + endPointg, params);
    return this.http.post<any>(this.config.PrimaryUrl + '/' + endPointg, params,
      { headers: headers }).pipe(
        catchError((err) => {
          console.error("status" + err.status);
          if (err.status == 401) {
            this.redirect("/login");
          }

          return (err);    //Rethrow it back to component
        })
      );;
    // } catch (e) {
    //   console.log(e);
    // }
  }

  get2(endPointg: string, params?: any, optn?: any) {
    if (!optn) {
      optn = { params: new HttpParams() };
    }
    let p = [];
    let newParam;
    if (params) {
      for (let k in params) {
        let str = k + '=' + params[k];
        p.push(str);
      }
      newParam = p.join('&');
    }
    // try {
    return this.http.get<any>(
      this.config.SecondaryUrl + '/' + endPointg + '?' + newParam
    );
    // } catch (e) {
    //   console.log(e);
    // }
  }

  post2(endPointg: string, params?: any, optn?: any) {
    if (!optn) {
      optn = { params: new HttpParams() };
    }
    // try {
    return this.http.post<any>(
      this.config.SecondaryUrl + '/' + endPointg,
      params
    );
    // } catch (e) {
    //   console.log(e);
    // }
  }

  webSocket(domain: string, param?: any) {
    var fws = new WebSocket(domain);
    fws.onopen = function () {
      fws.send(param); /* Send the message 'Ping' to the server*/
    };
    return fws;
  }

  UploadImage(endPointg: string, params?: any, optn?: any) {
    if (!optn) {
      optn = { params: new HttpParams() };
    }
    // try {
    // return this.http.post<any>(this.config.PrimaryUrl + '/' + endPointg, params);
    return this.http.post<any>(this.config.PHPURL + '/' + endPointg, params);
    // } catch (e) {
    //   console.log(e);
    // }
  }
}
