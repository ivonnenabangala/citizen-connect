import { Component, inject } from '@angular/core';
import { Documents } from '../../interfaces/documents';
import { DocumentsService } from '../../services/documents.service';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
// import { FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-documents',
  imports: [
    CommonModule, MatIconModule, MatListModule, MatCardModule, ReactiveFormsModule, 
    MatFormFieldModule, MatProgressSpinner, FormsModule, MatInputModule
  ],
  templateUrl: './admin-documents.component.html',
  styleUrl: './admin-documents.component.scss'
})
export class AdminDocumentsComponent {
  form!: FormGroup
  activeView: 'manage' | 'add' = 'manage';
  documents:Documents[] = []
  errorMessage:string = ''
  successMessage:string = ''
  isLoading: boolean = false

  constructor(
    private documentsService: DocumentsService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
          title: ['', Validators.required],
          description: ['', Validators.required],
          document: ['']
        })
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['view']) {
        this.activeView = params['view'];

        // Reset form when switching to add view
        if (this.activeView === 'add') {
          this.resetForm();
        }
      }
    });
    this.fetchDocuments()
    // this.cdr.detectChanges()
  }

  resetForm(): void {
    this.form.reset({title: '',});
    this.form.reset({description: '',});
    this.form.reset({document: '',});
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
    
    selectedFiles: File[] = [];
  selectedFileNames: string[] = [];

onFileSelected(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedFiles = Array.from(input.files); // Store multiple files
    this.selectedFileNames = this.selectedFiles.map(file => file.name); // Store file names in an array
  } else {
    this.selectedFileNames = [];
  }
}



  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = new FormData();
    formData.append('title', this.form.get('title')?.value);
    formData.append('description', this.form.get('description')?.value);

    this.selectedFiles.forEach(file => {
      formData.append('document', file); 
    });

    // console.log('FormData entries:', [...formData.entries()]); 

    this.documentsService.createDocument(formData).subscribe({
      next: () => {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        const verticalPosition: MatSnackBarVerticalPosition = 'top';
        this.isLoading = false;
        this.successMessage = '✅ Incident reported!';
        this.snackBar.open(this.successMessage, 'Close', { 
          duration: 3000, horizontalPosition, verticalPosition });
        this.cdr.detectChanges
      },
      error: (err) => {
        const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
        const verticalPosition: MatSnackBarVerticalPosition = 'top';
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Incident reporting failed! Please try again.';
        this.snackBar.open(this.errorMessage, 'Close', { 
          duration: 3000, horizontalPosition, verticalPosition });
        
      }
    });
  }


  get title() {
    return this.form.get('title')
  }

  get description() {
    return this.form.get('description')
  }

  get document() {
    return this.form.get('document')
  }
}
