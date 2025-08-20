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
  showLastCard:boolean=false;

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
    return this.http.get<string[]>('/webservice/irrcont/program');
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

  formError = '';


  validate() {
    const ok = this.name && this.contactNumber && this.email && this.trainingMode && this.selectedProgram;
    if (ok) {
      this.showNextCard = true;
      this.step = 2;
      this.formError = '';
    } else {
      this.showFormError('⚠ Please fill all fields before proceeding.');
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

    this.http.post('/webservice/irrcont/save', formData).subscribe(
      (res: any) => {
          this.name='';
          this.contactNumber='';
          this.email='';
          this.trainingMode='';
          this.selectedProgram='';
          this.programPrice='';
          this.paymentMethod='';
          this.transactionId='';
         this.step=3;
         this.showLastCard=true;
        }, () => {
        this.name='';
        this.contactNumber='';
        this.email='';
        this.trainingMode='';
        this.selectedProgram='';
        this.programPrice='';
        this.paymentMethod='';
        this.transactionId='';
        this.step=3;
        this.showLastCard=true;
        this.selectedFile=null;
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

  done() {
    this.step=1;
    this.showNextCard=false;
    this.showLastCard=false;
  }
  // Add to your AppComponent class:

  selectedFile: File | null = null;
  fileError = '';
  previewUrl: string | ArrayBuffer | null = null;
  isImage = false;

  uploading = false;
  uploadProgress = 0;
  uploadOk = false; // set true after server confirms upload

  onFileSelected(evt: Event) {
    this.fileError = '';
    this.previewUrl = null;
    this.isImage = false;
    this.uploadOk = false; // reset upload state when picking a new file

    const input = evt.target as HTMLInputElement;
    const file = input.files && input.files[0];
    if (!file) { this.selectedFile = null; return; }

    // Validate size: <= 5MB
    const MAX = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX) {
      this.fileError = 'File is larger than 5MB.';
      this.selectedFile = null;
      return;
    }

    // Validate type: image/jpeg, image/png, application/pdf
    const okTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (!okTypes.includes(file.type)) {
      this.fileError = 'Only PNG, JPG, or PDF files are allowed.';
      this.selectedFile = null;
      return;
    }

    this.selectedFile = file;
    this.isImage = file.type.startsWith('image/');

    // Show preview for images
    if (this.isImage) {
      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result);
      reader.readAsDataURL(file);
    }
  }

  uploadSelectedFile() {
    if (!this.selectedFile) { return; }
    if (!this.transactionId) {
      this.fileError = 'Enter Transaction ID before uploading.';
      return;
    }
    if (this.fileError) { return; }

    const form = new FormData();
    form.append('file', this.selectedFile);
    form.append('transactionId', this.transactionId);

    // show progress
    this.uploading = true;
    this.uploadProgress = 0;
    this.uploadOk = false;

    this.http.post('/webservice/irrcont/uploadLocal', form, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event: any) => {
        if (event.type === 1 && event.total) {
          // HttpEventType.UploadProgress === 1
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === 4) {
          // HttpEventType.Response === 4
          this.uploading = false;
          this.uploadOk = true;
        }
      },
      error: (err) => {
        this.uploading = false;
        this.uploadOk = false;
        this.fileError = 'Upload failed. Please try again.';
      }
    });
  }

  private _errTimer: any;

  private showFormError(msg: string) {
    this.formError = msg;
    // auto-hide after 4s
    if (this._errTimer) { clearTimeout(this._errTimer); }
    this._errTimer = setTimeout(() => this.formError = '', 4000);
  }

}
