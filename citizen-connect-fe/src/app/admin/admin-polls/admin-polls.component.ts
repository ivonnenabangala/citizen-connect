import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Polls } from '../../interfaces/polls';
import { PollsService } from '../../services/polls.service';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-admin-polls',
  imports: [
    MatListModule, CommonModule, MatIconModule, MatFormField, FormsModule, RouterLink,
    MatInputModule, ReactiveFormsModule, MatCardModule
  ],
  templateUrl: './admin-polls.component.html',
  styleUrl: './admin-polls.component.scss'
})
export class AdminPollsComponent implements OnInit {

  activeView: 'manage' | 'add' = 'manage';
  polls: Polls[] = []
  errorMessage: string = ''
  successMessage: string = ''

  pollForm: FormGroup;



  constructor(
    private pollsService: PollsService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private http: HttpClient
  ) {
    this.pollForm = this.fb.group({
      question: ['', Validators.required],
      // options: this.fb.array([
      //   this.fb.control('', Validators.required),
      //   this.fb.control('', Validators.required)
      // ]),
      // status: ['active', Validators.required]
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
    this.fetchPolls()
  }

  // get optionsArray(): FormArray {
  //   return this.pollForm.get('options') as FormArray;
  // }

  // addOption(): void {
  //   this.optionsArray.push(this.fb.control('', Validators.required));
  // }

  // removeOption(index: number): void {
  //   this.optionsArray.removeAt(index);
  // }

  resetForm(): void {
    this.pollForm.reset({
      question: '',
    });

    // Reset options array to two empty options
    // while (this.optionsArray.length) {
    //   this.optionsArray.removeAt(0);
    // }
    // this.optionsArray.push(this.fb.control('', Validators.required));
    // this.optionsArray.push(this.fb.control('', Validators.required));
  }

  fetchPolls(): void {
    this.pollsService.getPolls().subscribe({
      next: (data) => {
        console.log('Fetched Polls:', data); // Debugging log
        this.polls = data.map((poll: any) => {
          const totalVotes = poll.yes_votes + poll.no_votes;
          return {
            ...poll,
            totalVotes,
            yesPercentage: totalVotes > 0 ? (poll.yes_votes / totalVotes) * 100 : 0,
            noPercentage: totalVotes > 0 ? (poll.no_votes / totalVotes) * 100 : 0
          };
        }).slice(0, 4);
      },
      error: (error) => {
        console.error('Error fetching polls:', error);
      }
    });
  }

  deletePoll(poll: Polls): void {
    this.successMessage = '';
    this.errorMessage = '';
    const horizontalPosition: MatSnackBarHorizontalPosition = 'center';
    const verticalPosition: MatSnackBarVerticalPosition = 'top';


    const snackBarRef = this.snackBar.open(
      'Are you sure you want to delete this poll?',
      'Yes',
      { duration: 5000, horizontalPosition, verticalPosition } // Auto-close after 5 seconds
    );

    snackBarRef.onAction().subscribe(() => {
      this.pollsService.delete(poll).subscribe({
        next: () => {
          console.log(`Poll ${poll.pollId} deleted successfully`);
          this.polls = this.polls.filter(i => i.pollId !== poll.pollId);
          this.cdr.detectChanges();
          this.snackBar.open('Poll deleted successfully!', 'Close', {
            duration: 3000, horizontalPosition, verticalPosition
          });
        },
        error: (err) => {
          this.errorMessage = err?.error?.message || 'An error occurred while deleting the poll.';
          console.error('Delete failed:', err);
          this.snackBar.open(this.errorMessage, 'Close', {
            duration: 3000, horizontalPosition, verticalPosition
          });
        }
      });
    });
  }

  savePoll(): void {
    if (this.pollForm.invalid) return;

    const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 3);
  
  // Extract only the required fields from the form
  const { question} = this.pollForm.value;

  
  this.pollsService.createPoll(question, expirationDate).subscribe(
    (response) => {
      this.polls.push(response);
      this.activeView = 'manage';
    },
    (error) => {
      console.error('Error saving poll:', error);
    }
  );
  }

}
