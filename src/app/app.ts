import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { University } from "./components/university/university";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, University],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('sports_venues_front');
}
