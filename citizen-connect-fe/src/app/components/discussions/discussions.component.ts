import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Discussions } from '../../interfaces/discussions';
import { DiscussionsService } from '../../services/discussions.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-discussions',
  imports: [FormsModule, CommonModule, MatButtonModule, MatCardModule, MatIconModule, MatInputModule, MatProgressSpinnerModule,
    MatExpansionModule, MatFormFieldModule, ReactiveFormsModule
  ],
  templateUrl: './discussions.component.html',
  styleUrl: './discussions.component.scss'
})
export class DiscussionsComponent implements OnInit{
  // form!: FormGroup
  forms: { [key: number]: FormGroup } = {};
  errorMessage: string = ''
  successMessage: string = ''
  isLoading: boolean = false


  discussions: Discussions[] = []
  constructor(
    private formBuilder: FormBuilder,
    private discussionsService: DiscussionsService,
    private cdr: ChangeDetectorRef
  ) {
    // this.form = this.formBuilder.group({
    //   opinion: ['', Validators.required]
    // })
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

    fetchTopics(): void {
      this.discussionsService.getTopics().subscribe({
        next: (data: Discussions[]) => {
          this.discussions = data;
          this.forms = {}; // Reset forms before reassigning
          this.discussions.forEach((discussion) => {
            this.forms[discussion.topicId] = this.formBuilder.group({
              opinion: ['', Validators.required]
            });
          });
          this.cdr.detectChanges();
        }
      });
    }

  ngOnInit(): void {
    this.fetchTopics()
  }
  onSubmit(topicId: number): void {
    if (this.forms[topicId].invalid) {
      return;
    }

    this.isLoading = true;
    const opinion = this.forms[topicId].value.opinion;

    this.discussionsService.addOpinion(topicId, opinion).subscribe({
      next: () => {
        this.isLoading = false;
        this.forms[topicId].reset();
        this.openSnackBar('✅ Opinion submitted successfully!');
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.isLoading = false;
        this.openSnackBar(error?.error?.message || 'An error occurred while submitting your opinion.');
      }
    });
  }
  
  // onSubmit(): void{
  //   if(this.form.invalid){
  //     return
  //   }

  //   this.isLoading = true
  //   this.errorMessage = ''
  //   this.successMessage = ''

  //   const { opinion } = this.form.value

  //   this.discussionsService.addOpinion(opinion).subscribe({
  //     next: () => {
  //       this.isLoading = false
  //       this.successMessage = '✅ Opinion submitted successfully!';
  //       this.openSnackBar(this.successMessage)
  //       this.cdr.detectChanges()
  //     },
  //     error: (error) => {
  //       this.errorMessage = error?.error?.message || 'An error occurred while submitting your opinion.';
  //       this.cdr.detectChanges();
  //       this.openSnackBar(this.errorMessage);
  //       setTimeout(() => this.errorMessage = '', 3000);
  //     }
  //   })
  // }


  // fetchTopics(): void{
  //   this.discussionsService.getTopics().subscribe({
  //     next: (data: Discussions[]) => {
  //       this.cdr.detectChanges();
  //       this.discussions = [...data.map((discussion) => ({
  //         ...discussion
  //       }))]
  //       console.log(this.discussions);

  //     }
  //   })
  // }
}
