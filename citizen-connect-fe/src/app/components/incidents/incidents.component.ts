import { ChangeDetectionStrategy, Component, signal, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incidents } from '../../interfaces/incidents';
import { IncidentsService } from '../../services/incidents.service';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { ReportIncidentDialogComponent } from '../report-incident-dialog/report-incident-dialog.component';

@Component({
  selector: 'app-incidents',
  imports: [
    CommonModule, MatButtonModule, MatCardModule, MatIconModule, SlickCarouselModule,
    MatInputModule, MatProgressSpinnerModule, MatFormFieldModule, ReactiveFormsModule,
    MatExpansionModule
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IncidentsComponent implements OnInit {
  readonly panelOpenState = signal(false);
  incidents: Incidents[] = []

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true, // Keep this true if you want arrows
    dots: true,
    infinite: true,
    autoplay: false,
    speed: 500
  };



  constructor(
    private incidentsService: IncidentsService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {  }
  ngOnInit(): void {
    this.getIncidents()
    console.log('Component initialized at:', new Date().toISOString());
  }
  openReportDialog(): void {
    const dialogRef = this.dialog.open(ReportIncidentDialogComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'success') {
        this.getIncidents(); // Refresh incidents after successful report
        
      }
    });
  }

  getIncidents(): void {
    this.incidentsService.getIncidents().subscribe({
      next: (data: Incidents[]) => {
        this.incidents = [...data.map((incident) => ({
          ...incident,
          imageUrls: typeof incident.imageUrls === 'string' ? JSON.parse(incident.imageUrls) : [],
          timeAgo: this.getTimeAgo(new Date(incident.created_at))
        }))];
  
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error('Error fetching incidents:', error);
      }
    }) 
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
  slickInit(_e: any) {
    console.log('Slick initialized');
  }

  breakpoint(_e: any) {
    console.log('Breakpoint hit');
  }

  afterChange(_e: any) {
    console.log('After change event');
  }

  beforeChange(_e: any) {
    console.log('Before change event');
  }

  deleteIncident(incident: Incidents): void {
    this.incidentsService.delete(incident).subscribe({
      next: () => {
        console.log(`Incident ${incident.incidentId} deleted successfully`);
        this.incidents = this.incidents.filter(i => i.incidentId !== incident.incidentId); 
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

}
