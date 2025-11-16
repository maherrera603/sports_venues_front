import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Validator } from '../../helpers';
import { Alert } from "../../components/alert/alert";
import { Auth } from '../../services';
import { ISignUp } from '../../interfaces/IUser';

@Component({
  selector: 'app-singup',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    Alert
],
  templateUrl: './singup.html',
  styleUrl: './singup.scss',
})
export class Singup {
  @ViewChild(Alert, { static: true}) protected alert!:Alert;


  constructor( private readonly authService: Auth){}

  protected signUpForm = new FormGroup({
    name: new FormControl("", [ Validators.required, Validators.minLength(3), Validators.pattern(Validator.text)]),
    lastname: new FormControl("", [ Validators.required, Validators.minLength(3), Validators.pattern(Validator.text)]),
    phone: new FormControl("", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(Validator.number)]),
    email: new FormControl("", [Validators.required, Validators.email, Validators.pattern(Validator.email)]),
    password: new FormControl("", [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(Validator.password)])
  });


  protected get name(): FormControl {
    return this.signUpForm.get("name") as FormControl;
  }

  protected get lastname(): FormControl {
    return this.signUpForm.get("lastname") as FormControl;
  }

  protected get phone(): FormControl {
    return this.signUpForm.get("phone") as FormControl;
  }

  protected get email(): FormControl {
    return this.signUpForm.get("email") as FormControl;
  }

  protected get password(): FormControl {
    return this.signUpForm.get("password") as FormControl;
  }

  protected handleSubmit(){
    const auth = this.signUpForm.value as ISignUp;
    
    this.authService.signUp( auth ).subscribe(
      ({code, message, data}) => {
        if( !data ) return this.alert.handleAlertDanger( message );
        this.signUpForm.reset();
        return this.alert.handleAlertSuccess(message);
      }
    )
  }
}
