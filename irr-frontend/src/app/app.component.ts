import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {parseJson} from "@angular/cli/src/utilities/json-file";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule , HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'irr';

  programs: { id: number; program_name: string; price: number }[] = [];
  modes: string[] = [];
  showNextCard: boolean = false;

  name: string = '';
  contactNumber: string = '';
  email: string = '';
  trainingMode: string = '';
  selectedProgram: any = '';
  programPrice: any='';
  step = 1;        // 1 | 2 | 3
  progress = 30;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.modes = [
      'Online',
      'Offline',
      'Hybrid'
    ];
    this.getProgram().subscribe({
      next: (data: any) => {
        this.programs = data;

        console.log('Programs:', this.programs);
      },
      error: (err) => {
        console.error('Error fetching programs', err);
      }
    });
  }

  getProgram() {
    return this.http.get<string[]>('http://localhost:9000/irrcont/program');
  }


  setTrainingMode(mode:string) {
    this.trainingMode = mode;
  }

  setSelectedProgram(program: any) {
    console.log(program)
    this.selectedProgram = program;
    console.log('Selected Program:', this.selectedProgram);
  }

  validate() {
    // console.log("name: "+this.name)
    // console.log("name: "+this.contactNumber)
    // console.log("name: "+this.email)
    // console.log("name: "+this.trainingMode)
    // console.log("name: "+this.selectedProgram)
    // if (
    //   this.name &&
    //   this.contactNumber &&
    //   this.email &&
    //   this.trainingMode &&
    //   this.selectedProgram
    // ) {
    //   this.showNextCard = true; // show the next div
    // } else {
    //   alert('Please fill all fields before proceeding.');
    //   this.showNextCard = false;
    // }
    if (this.name && this.contactNumber && this.email && this.trainingMode && this.selectedProgram) {
      this.showNextCard = true;
    } else {
      alert('Please fill all fields before proceeding.');
    }
  }

  finalize() {

  }
}
