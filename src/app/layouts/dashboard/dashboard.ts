import { Component } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Alert } from "../../components/alert/alert";


@Component({
  selector: 'app-dashboard',
  imports: [Navbar, RouterOutlet],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {

}
