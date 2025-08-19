import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'irr';

  trainingMode: string = ''; // holds selected value

  // This is your dynamic data
  modes: string[] = ['Online', 'Offline', 'Self-Paced'];

  // Called when user selects an option
  setTrainingMode(mode: string) {
    this.trainingMode = mode;
    console.log('Selected Training Mode:', this.trainingMode);
  }

}
