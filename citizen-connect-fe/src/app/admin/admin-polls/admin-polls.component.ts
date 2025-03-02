import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Polls } from '../../interfaces/polls';
import { PollsService } from '../../services/polls.service';


@Component({
  selector: 'app-admin-polls',
  imports: [MatListModule, CommonModule, MatIconModule],
  templateUrl: './admin-polls.component.html',
  styleUrl: './admin-polls.component.scss'
})
export class AdminPollsComponent implements OnInit{
  
  polls:Polls[] = []
  constructor(
    private pollsService: PollsService
  ){}
  ngOnInit(): void {
    this.fetchPolls()
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
  
}
