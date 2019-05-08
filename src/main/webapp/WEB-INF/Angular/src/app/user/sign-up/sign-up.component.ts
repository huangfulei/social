import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {UserDataService} from '../../core/user-data.service';
import {IUser} from '../../model/User';
import {Router} from '@angular/router';
import {SubSink} from 'subsink';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  userInfo = {} as IUser;
  private subs = new SubSink();
  uppercaseExp = '^(?=.*[A-Z]).+$';
  lowercaseExp = '^(?=.*[a-z]).+$';
  numberExp = '^(?=.*[0-9]).+$';
  specialCharExp = '^(?=.*[!@#$%^&*()_+}{|":?></.,\';=-]).+$';
  signupForm: FormGroup;

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
      panelClass: ['red-snackbar']
    });
  }

  onSubmit() {
    this.userInfo.name = this.username.value;
    this.userInfo.password = this.password.value;
    this.userInfo.email = this.email.value;
    this.subs.sink = this.userService.saveNewUser(this.userInfo)
      .subscribe((data: IUser) => {
          this.userInfo = data;
        },
        // todo: error handling
        (error) => console.log(error.message),
        () => {
          if (this.userInfo.statusCode === 0) {
            this.openSnackBar(this.userInfo.statusMsg, '');
            setTimeout(() => {
            }, 2000);
            this.route.navigate(['/user/login']);
          }
        });
  }

  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get confirmPass() {
    return this.signupForm.get('confirmPass');
  }

  constructor(private fb: FormBuilder,
              private userService: UserDataService,
              private route: Router,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    console.log('init sign up component');
    this.signupForm = this.fb.group({
        username: ['', [Validators.required, Validators.maxLength(20)]],
        email: ['', [Validators.email, Validators.maxLength(25)]],
        password: ['',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(25),
            uppercaseValidator(new RegExp(this.uppercaseExp)),
            lowercaseValidator(new RegExp(this.lowercaseExp)),
            numberValidator(new RegExp(this.numberExp)),
            specialCharValidator(new RegExp(this.specialCharExp)),
          ]
        ],
        confirmPass: ['', Validators.required]
      }, {validator: confirmPassword('password', 'confirmPass')});
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

}

export function uppercaseValidator(exp: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const positive = exp.test(control.value);
    return positive ? null : {noUppercase: {value: control.value}};
  };
}

export function lowercaseValidator(exp: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const positive = exp.test(control.value);
    return positive ? null : {noLowercase: {value: control.value}};
  };
}

export function numberValidator(exp: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const positive = exp.test(control.value);
    return positive ? null : {noNumber: {value: control.value}};
  };
}

export function specialCharValidator(exp: RegExp): ValidatorFn {

  return (control: AbstractControl): { [key: string]: any } | null => {
    const positive = exp.test(control.value);
    return positive ? null : {noSpecialChar: {value: control.value}};
  };
}

export function confirmPassword(passControlName: string, confirmPassControlName: string) {
  return (formGroup: FormGroup) => {
    const passControl = formGroup.controls[passControlName];
    const confirmPassControl = formGroup.controls[confirmPassControlName];

    if (confirmPassControl.errors && !confirmPassControl.errors.notMach) {
      return;
    }

    if (passControl.value !== confirmPassControl.value) {
      confirmPassControl.setErrors({notMatch: true});
    } else {
      confirmPassControl.setErrors(null);
    }
  };
}


