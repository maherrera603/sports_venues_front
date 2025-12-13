import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { Auth } from '../../services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  protected isAdmin:boolean;
  protected isUser: boolean;
  @ViewChild("navbarMovile", { static: true }) protected navbarMovile!: ElementRef<HTMLElement>;

  constructor(private readonly authService: Auth, private  readonly router: Router){
    this.isAdmin = this.authService.isAdmin;
    this.isUser = this.authService.isUser;
  }

  protected handleCloseSession(){
    this.authService.resetLS();
    this.router.navigate([""]);
  }


  protected handleOpenAndCloseNavbar(){
    console.log("debugueando");
    const isValid = this.navbarMovile.nativeElement.classList.contains("navbar__active");
    if( !isValid ) return this.navbarMovile.nativeElement.classList.add("navbar__active");
    return this.navbarMovile.nativeElement.classList.remove("navbar__active");
  }

}
