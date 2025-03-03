import { Component, signal, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incidents } from '../../interfaces/incidents';
import { IncidentsService } from '../../services/incidents.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogRef } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-report-incident-dialog',
  imports: [
    CommonModule, MatInputModule, MatFormFieldModule, MatProgressSpinnerModule, 
    ReactiveFormsModule, MatIconModule, MatCardModule, MatButtonModule
  ], 
  templateUrl: './report-incident-dialog.component.html',
  styleUrl: './report-incident-dialog.component.scss'
})
export class ReportIncidentDialogComponent {
  form!: FormGroup
  errorMessage: string = ''
  successMessage: string = ''
  isLoading: boolean = false

  constructor(
    private incidentsService: IncidentsService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<ReportIncidentDialogComponent>,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      images: ['']
    })
  }

  private _snackBar = inject(MatSnackBar);
  
    horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    verticalPosition: MatSnackBarVerticalPosition = 'top';
    durationInSeconds = 5;
  
    openSnackBar(message: string, action: string = 'Close') {
      this._snackBar.open(message, action, {
        horizontalPosition: this.horizontalPosition,
        verticalPosition: this.verticalPosition,
        duration: this.durationInSeconds * 1000,
      });
    }

    
  ngOnInit(): void {
    console.log('In dialog');
    
    console.log('Component initialized at:', new Date().toISOString());
  }


  // selectedFileNames: string = 'No files selected';


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
    formData.append('location', this.form.get('location')?.value);

    this.selectedFiles.forEach(file => {
      formData.append('images', file); 
    });

    // console.log('FormData entries:', [...formData.entries()]); 

    this.incidentsService.createIncident(formData).subscribe({
      next: () => {
        this.isLoading = false;
        this.successMessage = '✅ Incident reported!';
        this.openSnackBar(this.successMessage)
        this.cdr.detectChanges
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Incident reporting failed! Please try again.';
        this.openSnackBar(this.errorMessage)
        
      }
    });
    this.dialogRef.close();
  }


  get title() {
    return this.form.get('title')
  }

  get description() {
    return this.form.get('description')
  }

  get location() {
    return this.form.get('location')
  }
  get images() {
    return this.form.get('images')
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
