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
  styleUrls: ['./app.component.css']
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
  paymentMethod = '';
  transactionId :any = '';
  step = 1;        // 1 | 2 | 3
  progress = 30;
  paymentMethods = [
    'bKash','Bank'
  ];
  bank: any;
  merchantNumber:any='01708491569';
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
      },
      error: (err) => {
      }
    });
  }

  getProgram() {
    return this.http.get<string[]>('http://192.168.14.136:8282/webservice/irrcont/program');
  }


  setTrainingMode(mode:string) {
    this.trainingMode = mode;
  }

  setSelectedProgram(program: any) {
    let selected = this.programs.find(p => p.program_name === program);
    if (selected) {
      this.selectedProgram = program;
      this.programPrice = selected.price;
    }
  }

  validate() {
    if (this.name && this.contactNumber && this.email && this.trainingMode && this.selectedProgram) {
      this.showNextCard = true;
      this.step=2;
    } else {
      alert('Please fill all fields before proceeding.');
    }
  }

  finalize() {
    const formData = new FormData();
    formData.append("name", this.name);
    formData.append("contactNumber", this.contactNumber);
    formData.append("email", this.email);
    formData.append("trainingMode", this.trainingMode);
    formData.append("program", this.selectedProgram);
    formData.append("programPrice", this.programPrice.toString());
    formData.append("paymentMethod", this.paymentMethod);
    formData.append("transactionId", this.transactionId);

    this.http.post('http://192.168.14.136:8282/webservice/irrcont/save', formData).subscribe(
      (res: any) => {
          this.name='';
          this.contactNumber='';
          this.email='';
          this.trainingMode='';
          this.selectedProgram='';
          this.programPrice='';
          this.paymentMethod='';
          this.transactionId='';
         this.step=1;
         this.showNextCard=false;
        }, () => {
        this.name='';
        this.contactNumber='';
        this.email='';
        this.trainingMode='';
        this.selectedProgram='';
        this.programPrice='';
        this.paymentMethod='';
        this.transactionId='';
        this.step=1;
        this.showNextCard=false;
        }
      );
  }

  get merchantNo(): string {
    return this.paymentMethod === 'bkash' ? '01708 491 569' : '';
  }

  goBack() {
    this.step=1;
    this.showNextCard=false;
  }
}
