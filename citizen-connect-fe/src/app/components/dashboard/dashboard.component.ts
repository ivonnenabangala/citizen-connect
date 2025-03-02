import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Polls } from '../../interfaces/polls';
import { PollsService } from '../../services/polls.service';
import { Incidents } from '../../interfaces/incidents';
import { IncidentsService } from '../../services/incidents.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, MatCardModule, MatIconModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  polls: Polls[] = [];
  incidents: Incidents[] = []

  otherPolls = [
    { title: 'Poll 5', content: 'Description for poll 5' },
    { title: 'Poll 6', content: 'Description for poll 6' }
  ];

  constructor(
    private pollsService: PollsService,
    private incidentsService: IncidentsService
  ) {}
  ngOnInit(): void {
    this.fetchPolls()
    this.fetchIncidents()
  }

  fetchPolls(): void{
    this.pollsService.getPolls().subscribe({
      next: (data) => {
        const processedPolls = data.map((poll: any) => ({
          ...poll,
          totalVotes: poll.yes_votes + poll.no_votes
        }));

        this.polls = processedPolls.slice(0, 4);
      },
      error: (error) => {
        console.error('Error fetching polls:', error);
      }
    })
  }

  fetchIncidents(): void {
    this.incidentsService.getIncidents().subscribe({
      next: (data: Incidents[]) => {
        this.incidents = data.slice(0, 2).map((incident: Incidents) => ({
          ...incident,
          timeAgo: this.getTimeAgo(new Date(incident.created_at))
        }));
      },
      error: (error) => {
        console.error('Error fetching incidents:', error);
      }
    });
  }

  getTimeAgo(date: Date): string {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals = {
      year: 31536000,
      month: 2592000,
      week: 604800,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1
    };

    for (const [unit, secondsInUnit] of Object.entries(intervals)) {
      const count = Math.floor(seconds / secondsInUnit);
      if (count >= 1) {
        return `${count} ${unit}${count > 1 ? 's' : ''} ago`;
      }
    }

    return 'Just now';
  }

}
