import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-alert',
  imports: [],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  @ViewChild("alert", { static: true}) protected alert!:ElementRef<HTMLElement>;  
  @ViewChild("alertMessage", { static: true}) protected alertMessage!:ElementRef<HTMLElement>;
  @ViewChild("alertTitle", { static: true}) protected alertTitle!:ElementRef<HTMLElement>;  


  public handleAlertDanger( message: string){
    this.alert.nativeElement.classList.add("content__alert__danger");
    this.alertMessage.nativeElement.innerHTML = message;
    this.alertTitle.nativeElement.textContent = "Error!!"
    setTimeout(() => {
      this.alert.nativeElement.classList.remove("content__alert__danger");
      this.alertMessage.nativeElement.textContent = "";
    }, 4000);
  }

  public handleAlertSuccess( message: string) {
    this.alert.nativeElement.classList.add("content__alert__success");
    this.alertMessage.nativeElement.innerHTML = message;
    this.alertTitle.nativeElement.textContent = "Exito!!"
    setTimeout(() => {
      this.alert.nativeElement.classList.remove("content__alert__success");
      this.alertMessage.nativeElement.textContent = "";
    }, 4000);
  }

}
