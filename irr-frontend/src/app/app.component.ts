import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterOutlet} from '@angular/router';
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {parseJson} from "@angular/cli/src/utilities/json-file";
import {initialState} from "ngx-bootstrap/timepicker/reducer/timepicker.reducer";
import {AdminComponent} from "./admin/admin.component";
import {BsModalService} from "ngx-bootstrap/modal";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule , HttpClientModule ],
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
  constructor(private http: HttpClient) {}

  path: string | null = null;

  ngOnInit() {
  }

}
