import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatRadioModule} from '@angular/material/radio';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSnackBar, MatSnackBarHorizontalPosition,MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import { PollsService } from '../../services/polls.service';
import { Polls } from '../../interfaces/polls';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-polls',
  imports: [
    CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatRadioModule, MatProgressBarModule
  ],
  templateUrl: './polls.component.html',
  styleUrl: './polls.component.scss'
})
export class PollsComponent implements OnInit{
  polls:Polls[] = []
  errorMessage:string = ''
  successMessage:string = ''
  constructor(
    private pollsService: PollsService,
    private cdr: ChangeDetectorRef
  ) {}
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
    this.fetchPolls()
  }
  fetchPolls(): void {
    this.pollsService.getPolls().subscribe({
      next: (data) => {
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

  vote(poll: Polls, voteType: 'yes' | 'no'): void{
    this.successMessage = '';
    this.errorMessage = '';
    this.pollsService.vote(poll.pollId, voteType).subscribe({
      next: () => {
        poll.yes_votes += voteType === 'yes'? 1 : 0
        poll.no_votes += voteType === 'no'? 1 : 0
        poll.totalVotes += poll.yes_votes + poll.no_votes
        poll.yesPercentage = poll.totalVotes > 0? (poll.yes_votes / poll.totalVotes) * 100 : 0;
        poll.noPercentage = poll.totalVotes > 0 ? (poll.no_votes / poll.totalVotes) * 100 : 0;
        this.successMessage = 'Your vote has been submitted!';
        this.openSnackBar(this.successMessage)
        this.cdr.detectChanges(); // Force update in UI
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        // console.error('Error submitting vote', error)
        this.errorMessage = error?.error?.message || 'An error occurred while submitting your vote.';
        this.cdr.detectChanges();
        this.openSnackBar(this.errorMessage);
        setTimeout(() => this.errorMessage = '', 3000);
      }
    })
  }
  
}
