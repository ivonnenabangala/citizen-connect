import { Component, inject } from '@angular/core';
import { Documents } from '../../interfaces/documents';
import { DocumentsService } from '../../services/documents.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-documents',
  imports: [CommonModule, MatIconModule, MatListModule],
  templateUrl: './admin-documents.component.html',
  styleUrl: './admin-documents.component.scss'
})
export class AdminDocumentsComponent {
  documents:Documents[] = []
  errorMessage:string = ''
  successMessage:string = ''

  constructor(
    private documentsService: DocumentsService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
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

    deleteDocument(document: Documents): void {
      this.successMessage = '';
      this.errorMessage = '';
      const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
      const verticalPosition: MatSnackBarVerticalPosition = 'top';

    
      const snackBarRef = this.snackBar.open(
        'Are you sure you want to delete this document?', 
        'Yes', 
        { duration: 5000, horizontalPosition, verticalPosition } // Auto-close after 5 seconds
      );
    
      snackBarRef.onAction().subscribe(() => {
        this.documentsService.delete(document).subscribe({
          next: () => {
            console.log(`Document ${document.documentId} deleted successfully`);
            this.documents = this.documents.filter(i => i.documentId !== document.documentId); 
            this.cdr.detectChanges();
            this.snackBar.open('Document deleted successfully!', 'Close', { 
              duration: 3000, horizontalPosition, verticalPosition });
          },
          error: (err) => {
            this.errorMessage = err?.error?.message || 'An error occurred while deleting the document.';
            console.error('Delete failed:', err);
            this.snackBar.open(this.errorMessage, 'Close', { 
              duration: 3000, horizontalPosition, verticalPosition });
          } 
        });
      });
    }
    
}
