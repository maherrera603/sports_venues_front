import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { Validator } from '../../helpers';
import { Alert } from "../../components/alert/alert";
import { Auth } from '../../services';
import { ISignIn } from '../../interfaces/IUser';


@Component({
  selector: 'app-singin',
  imports: [
    ReactiveFormsModule,
    RouterLink,
    Alert
],
  templateUrl: './singin.html',
  styleUrl: './singin.scss',
})
export class Singin {
  @ViewChild(Alert, { static: true}) protected alert!:Alert;

  constructor( private readonly authService: Auth, private readonly router: Router){}

  protected singInForm = new FormGroup({
    email: new FormControl("", [ Validators.required, Validators.email, Validators.pattern(Validator.email)]),
    password: new FormControl("", [ Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(Validator.password)])
  });

  protected get email(): FormControl {
    return this.singInForm.get('email') as FormControl;
  }

  protected get password(): FormControl {
    return this.singInForm.get('password') as FormControl;
  }

  public handleResetForm(){
    this.singInForm.reset();
  }


  protected handleSubmit(){
    const auth = this.singInForm.value as ISignIn;
    this.authService.signIn( auth ).subscribe(
      ({ code, message, data }) => {
        if(!data) return this.alert.handleAlertDanger(message);
        
        this.authService.saveUserLS(data.user);
        this.authService.saveTokenLS(data.token);

        this.redirectToPage(data.user.role);       

        return this.alert.handleAlertSuccess(message);
      }
    );
  }

  private redirectToPage( role: string ){
    switch( role ){
      case "ADMIN_ROLE":
        this.router.navigate(["administrador"]);
        break;
      case "USER_ROLE":
        this.router.navigate(["usuario"]);
        break;
      default:
        this.authService.resetLS();
        this.router.navigate([""]);
        break;
    }
  }
}
