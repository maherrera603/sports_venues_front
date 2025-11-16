import { Component, ViewChild } from '@angular/core';
import { SportVenues } from "./components/sport-venues/sport-venues";
import { Alert } from "../../components/alert/alert";

@Component({
  selector: 'app-home',
  imports: [SportVenues, Alert],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  @ViewChild("alert", { static: true}) alert!:Alert; 
}
