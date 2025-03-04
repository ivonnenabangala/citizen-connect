import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Discussions } from '../../interfaces/discussions';
import { DiscussionsService } from '../../services/discussions.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-discussions',
  imports: [
    CommonModule, MatListModule, MatIconModule, MatCardModule, MatFormField, MatInputModule,
    ReactiveFormsModule, FormsModule, RouterLink
  ],
  templateUrl: './admin-discussions.component.html',
  styleUrl: './admin-discussions.component.scss'
})
export class AdminDiscussionsComponent implements OnInit {
  form!: FormGroup
  discussions: Discussions[] = []
  activeView: 'manage' | 'add' = 'manage';
  errorMessage: string = ''
  successMessage: string = ''
  isLoading: boolean = false
  summarizedOpinion: string = '';

  constructor(
    private discussionsService: DiscussionsService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      question: ['', Validators.required],
    });
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
    this.fetchTopics()
  }
  resetForm(): void {
    this.form.reset({
      question: '',
    });

  }
  fetchTopics(): void {
    this.discussionsService.getTopics().subscribe({
      next: (data: Discussions[]) => {
        this.discussions = data;
        this.cdr.detectChanges();
        console.log('Discussions', data);

      }
    });
  }


  fetchSummarizedOpinion(discussion: Discussions): void {
    discussion.isLoading = true;
    discussion.errorMessage = ''; // Reset error state
  
    this.discussionsService.getSummarizedOpinions(discussion.topicId).subscribe({
      next: (summary) => {
        // console.log('✅ Fetched Summary:', summary);
        discussion.summarizedOpinion = summary;
        discussion.isLoading = false;
      },
      error: (error) => {
        // console.error('❌ Error fetching summary:', error);
        discussion.errorMessage = 'Failed to load summary. Please try again.';
        discussion.isLoading = false;
      }
    });
  }
  

  deleteTopic(topic: Discussions): void {
    this.successMessage = '';
    this.errorMessage = '';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';


    const snackBarRef = this.snackBar.open(
      'Are you sure you want to delete this discussion topic?',
      'Yes',
      { duration: 5000, horizontalPosition, verticalPosition } // Auto-close after 5 seconds
    );

    snackBarRef.onAction().subscribe(() => {
      this.discussionsService.deleteTopic(topic).subscribe({
        next: () => {
          console.log(`Document ${topic.topicId} deleted successfully`);
          this.discussions = this.discussions.filter(i => i.topicId !== topic.topicId);
          this.cdr.detectChanges();
          this.snackBar.open('Document deleted successfully!', 'Close', {
            duration: 3000, horizontalPosition, verticalPosition
          });
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'An error occurred while deleting the document.';
          console.error('Delete failed:', err);
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000, horizontalPosition, verticalPosition
          });
        }
      });
    });
  }

  saveTopic(): void {
    if (this.form.invalid) return;
    const { question } = this.form.value;


    this.discussionsService.createTopic(question).subscribe(
      (response) => {
        this.discussions.push(response);
        this.activeView = 'manage';
      },
      (error) => {
        console.error('Error saving topic:', error);
      }
    );
  }
}
