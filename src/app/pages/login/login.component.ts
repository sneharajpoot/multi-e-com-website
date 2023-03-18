import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CartService } from 'src/app/service/api/cart.service';
import { GlobalService } from 'src/app/service/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  passwordType: boolean = true;
  frmLogin: any;

  showPassword: boolean = false;
  config: any;
  frmSignup: any;

  constructor(
    // translate: TranslateService,
    private gbls: GlobalService,
    private fb: FormBuilder,
    private cart: CartService
  ) {


    // this language will be used as a fallback when a translation isn't found in the current language
    // translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    // translate.use('en');

  }

  ngOnInit(): void {
    // this.gbls.resetTrader();

    this.bindFrmSignup();

    // this.gbls.BannersOpen.subscribe((data: any) => {
    //   if (data && data != 2)
    //     this.gbls.BannersOpenSrc.next(2);
    // });


    // this.gbls.Config.subscribe((d: any) => {
    //   this.config = d;
    // })

  }

  setCookie(cname: string, cvalue: any, exdays: number) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  getCookie(cname: string) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "{}";
  }

  checkCookie() {
    var username = this.getCookie("username");
    if (username != "") {
      alert("Welcome again " + username);
    } else {
      // username = prompt("Please enter your name:", "");
      // if (username != "" && username != null) {
      //   this.setCookie("username", username, 365);
      // }
    }
  }

  bindFrmSignup() {

    var Email;
    var Password;
    var remember = false;


    var c: any = this.gbls.getLocalStorage('cridential');
    if (c != null) {
      var cc = (c);
      Email = cc.Email;
      Password = cc.Password;
      remember = true;
    }


    this.frmLogin = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Otp: ['', []],
      remember: [true]
    });
    this.frmLogin.valueChanges.subscribe((data: any) => {
      this.logValidationErrorLogin(this.frmLogin);
    });


    this.frmSignup = this.fb.group({
      Name: ['', [Validators.required]],
      Mobile: ['', [Validators.required]],
      Password: ['', [Validators.required]],
      Email: ['', [Validators.required, Validators.email]],
      Otp: ['', []],
    });
    this.frmSignup.valueChanges.subscribe((data: any) => {
      this.logValidationErrorLogin(this.frmSignup);
    });

  }
  formErrorsLogin: any = {
    Email: '',
    Password: '',
    Mobile: '',
    Otp: '',
    remember: '',
  };
  errorMessagesLogin: any = {
    Email: { required: 'Enter Email Address ', email: "Please Enter Valid  Email" },
    Password: { required: 'Enter Password' },
    Mobile: { required: 'Enter Mobile' },
    Otp: { required: 'Enter Otp' },
    remember: { required: 'Enter remember' },
  };
  logValidationErrorLogin(group: FormGroup = this.frmLogin): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);
      if (abstractControl instanceof FormGroup) {
        this.logValidationErrorLogin(abstractControl);
      } else {
        this.formErrorsLogin[key] = '';
        if (
          abstractControl &&
          !abstractControl.valid &&
          (abstractControl.touched || abstractControl.dirty)
        ) {
          const messages = this.errorMessagesLogin[key];
          for (const errorKey in abstractControl.errors) {
            if (errorKey) {
              this.formErrorsLogin[key] += messages[errorKey] + ' ';
            }
          }
        }
      }
    });
  }
  markFormTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      if (control.controls) {
        // control is a FormGroup
        this.markFormTouched(control);
      } else {
        // control is a FormControl
        control.markAsTouched();
      }
    });
    this.logValidationErrorLogin();
  }

  login(p: any) {

    this.markFormTouched(this.frmLogin);



    // if (!this.frmLogin.valid) {
    //   return;
    // }
    var parms: any = {
      Email: p.Email,
      Password: p.Password
    }
    if (p.remember) {
      this.gbls.setLocalStorage('cridential', (parms));

      this.setCookie("cridential", JSON.stringify(parms), 2)
    } else {
      localStorage.removeItem('cridential');
    }

    try {
      this.gbls.loaderStart();
      this.gbls.login(parms).subscribe(
        (data: any) => {
          this.gbls.loaderStop();
          console.log("data", data)
          if (data.result) {
            const cart = this.gbls.getCartLocalStorage();

            cart.forEach((p: any) => {
              let par = {
                product_id: p.product_id,
                product_item_id: p.product_item_id  ,
                quantity: p.quantity,
                buyer_id: data.data?.buyerId,
                address_id: 0,
                color: p.color,
                size: p.size,
              }

              this.cart.addcart(par).subscribe((data: any) => { });

            });
            let redirectURL = "/";

            if (redirectURL) {
              // Emitters.authEmitter.emit(true);
              let session = {
                xid: data.buyerId,
                token: data.token
              }
              // this.gbls.setSession(session);

              this.gbls.setLocalStorage('session', (session));

              // this.gbls.setLocalStorage('cBuyer', (data.profile));

              // this.gbls.LoggedUser.subscribe();
              // this.gbls.PLATFORMTYPESrc.next(data.profile.Account_Type || 1);

              this.gbls.setLocalStorage('cBuyer', (data.data.loadedUser));
              this.gbls.LoggedUserSrc.next(data.data.loadedUser);
              this.gbls.loadData();
              this.gbls.successNotification("You have logged in Successfully.");

              // this.gbls.redirect(redirectURL);

            } else {
              return;
            }
          } else {
            this.gbls.errorNotification(data.res.Message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }

  loginOTP(p: any) {

    var parms: any = {
      phone: p.Mobile,
      email: p.Email,
    }

    try {
      this.gbls.loaderStart();
      this.gbls.loginOTP(parms).subscribe(
        (data: any) => {
          this.gbls.loaderStop();
          if (data.res.result) {
            let redirectURL = "";

            if ([1].includes(this.config.PLATFORMTYPE)) {
              if (data.profile.Account_Type == 1 || data.profile.Account_Type == 2) {
                redirectURL = ("/dashboard");
              } else if (data.profile.Account_Type == 3) {
                redirectURL = ("/dashboard/partner-room");
              } else {
                this.gbls.errorNotification("Invalid Account Type");
              }
            } else if ([2].includes(this.config.PLATFORMTYPE)) {
              if (data.profile.Account_Type == 2) {
                redirectURL = ("/dashboard");
              } else {
                this.gbls.errorNotification("This is for Trader login only.");
              }
            } else if ([3].includes(this.config.PLATFORMTYPE)) {
              if (data.profile.Account_Type == 3) {
                redirectURL = ("/dashboard/partner-room");
              } else {
                this.gbls.errorNotification("This is for IB login only.");
              }
            } else {
              this.gbls.errorNotification("Invalid Platform Type Id");
            }

            if (redirectURL) {
              // Emitters.authEmitter.emit(true);
              let session = {
                xid: data.profile.Trader_Id,
                token: data.token
              }
              // this.gbls.setSession(session);

              this.gbls.setLocalStorage('session', (session));

              this.gbls.setLocalStorage('cTrader', (data.profile));

              // this.gbls.LoggedUser.subscribe();
              // this.gbls.PLATFORMTYPESrc.next(data.profile.Account_Type || 1);

              this.gbls.setLocalStorage('cTrader', (data.profile));
              this.gbls.LoggedUserSrc.next(data.profile);
              this.gbls.loadData();
              this.gbls.successNotification("You have logged in Successfully.");

              this.gbls.redirect(redirectURL);

            } else {
              return;
            }
          } else {
            this.gbls.errorNotification(data.res.Message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }

  otpValidation: boolean = false
  signup(p: any) {

    var parms: any = {
      phone: p.Mobile,
      email: p.Email,
      name: p.Name,
      password: p.Password,
    }

    try {
      this.gbls.loaderStart();
      this.gbls.signup(parms).subscribe(
        (data: any) => {
          this.gbls.loaderStop();
          if (data.res.result) {
            this.otpValidation = true;

            this.gbls.successNotification(data.res.Message);

          } else {
            this.gbls.errorNotification(data.res.Message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }
  verifyotp(p: any) {

    var parms: any = {
      otp: p.Otp,
      email: p.Email,
    }

    try {
      this.gbls.loaderStart();
      this.gbls.verifyotp(parms).subscribe(
        (data: any) => {
          this.gbls.loaderStop();
          if (data.res.result) {
            this.otpValidation = true;

            this.gbls.successNotification(data.res.Message);

          } else {
            this.gbls.errorNotification(data.res.Message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }

  loginOTPVerify(otp: any) {

    var parms: any = {
      otp: otp,
      // Password: p.Password
    }
    try {
      this.gbls.loaderStart();
      this.gbls.loginOTPVerify(parms).subscribe(
        (data: any) => {
          this.gbls.loaderStop();
          if (data.res.result) {
            let redirectURL = "/";

            if (redirectURL) {
              // Emitters.authEmitter.emit(true);
              let session = {
                xid: data.profile.Trader_Id,
                token: data.token
              }
              // this.gbls.setSession(session);

              this.gbls.setLocalStorage('session', (session));

              this.gbls.setLocalStorage('cTrader', (data.profile));

              // this.gbls.LoggedUser.subscribe();
              // this.gbls.PLATFORMTYPESrc.next(data.profile.Account_Type || 1);

              this.gbls.setLocalStorage('cTrader', (data.profile));
              this.gbls.LoggedUserSrc.next(data.profile);
              this.gbls.loadData();
              this.gbls.successNotification("You have logged in Successfully.");

              this.gbls.redirect(redirectURL);

            } else {
              return;
            }
          } else {
            this.gbls.errorNotification(data.res.Message);
          }
        },
        (error: any) => {
          this.gbls.loaderStop();
          this.gbls.errorNotification('Server Not Responding');
        }
      );
    } catch (e) {
      this.gbls.loaderStop();
      this.gbls.errorNotification(' Catch Error');
    }
  }
}
