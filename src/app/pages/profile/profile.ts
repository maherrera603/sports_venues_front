import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Validator } from '../../helpers';
import { Auth, User } from '../../services';
import { IUser } from '../../interfaces/IUser';
import { Alert } from "../../components/alert/alert";

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, Alert],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  protected user!: IUser;
  @ViewChild("alert", { static: true}) alert!: Alert;

  constructor( 
    private readonly authService: Auth,
    private readonly userService: User,
    private cdref: ChangeDetectorRef,
  ){}

  ngOnInit(): void {
    this.user = this.authService.getUserLS!;
    this.loadForm(this.user);
  }


  protected get lettersInitial(): string{
    return this.user.name.charAt(0) + this.user.lastname.charAt(0);
  }

  private loadForm( user: IUser){
    this.profileForm.patchValue(user);
  }

  protected profileForm = new FormGroup({
    name: new FormControl("",  [Validators.required, Validators.minLength(3), Validators.pattern(Validator.text)]),
    lastname: new FormControl("",  [Validators.required, Validators.minLength(3), Validators.pattern(Validator.text)]),
    phone: new FormControl("",  [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(Validator.number)]),
    email: new FormControl("",  [Validators.required, Validators.email]),
  });

  protected get name(): FormControl{
    return this.profileForm.get("name") as FormControl;
  }

  protected get lastname(): FormControl{
    return this.profileForm.get("lastname") as FormControl;
  }
  
  protected get phone(): FormControl {
    return this.profileForm.get("phone") as FormControl;
  }
  
  protected get email(): FormControl {
    return this.profileForm.get("email") as FormControl;
  }

  protected handleSubmit(){
    const data =  this.profileForm.value as IUser;

    this.userService.update(data).subscribe(
      ({ message, data }) => {
        
        if(!data) return this.alert.handleAlertDanger(message);

        this.user = data;
        this.authService.saveUserLS(data);
        this.loadForm(data);
        this.cdref.detectChanges();

        return this.alert.handleAlertSuccess(message);
      }
    )
  }

}
