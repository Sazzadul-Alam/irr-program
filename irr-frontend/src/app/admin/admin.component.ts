import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // 👈 import this

interface EnrollmentRow {
  name?: string;
  contact?: string;
  training_mode?: string;
  program_name?: string;
  trx_id?: string;
  email?: string;
  method?: string;
  sender_account?: string;
  registration_date?: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],   // 👈 include it here
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  constructor(private http: HttpClient) {}

  list: EnrollmentRow[] = [];
  searchTerm = '';
  filteredList: EnrollmentRow[] = [];

  ngOnInit() {
    this.http.get<EnrollmentRow[]>('/webservice/irrcont/admin/data').subscribe(data => {
      this.list = data ?? [];
      this.filteredList = [...this.list];
    });
  }

  private norm(v?: string): string {
    return (v ?? '').toLowerCase();
  }

  applyFilter() {
    const term = this.norm(this.searchTerm);
    this.filteredList = this.list.filter((item: EnrollmentRow) =>
      this.norm(item.name).includes(term) ||
      this.norm(item.contact).includes(term) ||
      this.norm(item.training_mode).includes(term) ||
      this.norm(item.program_name).includes(term) ||
      this.norm(item.trx_id).includes(term) ||
      this.norm(item.sender_account).includes(term) ||
      this.norm(item.method).includes(term) ||
      this.norm(item.email).includes(term)
    );
  }
}
