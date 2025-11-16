import { Component, OnInit } from '@angular/core';
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

  constructor(private readonly authService: Auth, private  readonly router: Router){
    this.isAdmin = this.authService.isAdmin;
    this.isUser = this.authService.isUser;
  }

  protected handleCloseSession(){
    this.authService.resetLS();
    this.router.navigate([""]);
  }

}
