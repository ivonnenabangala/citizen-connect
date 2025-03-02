import { Component } from '@angular/core';
import { Documents } from '../../interfaces/documents';
import { DocumentsService } from '../../services/documents.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-documents',
  imports: [CommonModule, MatIconModule, MatListModule],
  templateUrl: './admin-documents.component.html',
  styleUrl: './admin-documents.component.scss'
})
export class AdminDocumentsComponent {
documents:Documents[] = []

  constructor(
    private documentsService: DocumentsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDocuments()
    // this.cdr.detectChanges()
  }

  fetchDocuments(): void {
      this.documentsService.getDocuments().subscribe({
        next: (data: Documents[]) => {
          this.documents = [...data.map((incident) => ({
            ...incident,
          }))];
          console.log(this.documents);
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching documents:', error);
        }
      }) 
    }
}
