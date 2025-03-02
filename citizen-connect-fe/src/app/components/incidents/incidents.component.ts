import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-incidents',
  imports: [
    CommonModule, MatButtonModule, MatCardModule, MatIconModule, SlickCarouselModule,
    MatInputModule, MatProgressSpinnerModule, MatFormFieldModule, ReactiveFormsModule
  ],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.scss'
})
export class IncidentsComponent implements OnInit {
  incidents: Incidents[] = []
  form!: FormGroup
  errorMessage: string = ''
  successMessage: string = ''
  isLoading: boolean = false

  slides = [
    { img: "assets/images/intro.jpeg" },
    { img: "assets/images/country.png" },
    { img: "assets/images/hands.jpeg" },
    { img: "assets/images/intro.jpeg" },
    { img: "assets/images/intro.jpeg" },
  ];
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
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      images: ['']
    })
  }
  ngOnInit(): void {
    this.getIncidents()
    console.log('Component initialized at:', new Date().toISOString());
  }

  getIncidents(): void {
    this.incidentsService.getIncidents().subscribe({
      next: (data: Incidents[]) => {
        this.incidents = data.map((incident) => {
          const parsedImageUrls = typeof incident.imageUrls === "string" ? JSON.parse(incident.imageUrls) : [];

          return {
            ...incident,
            imageUrls: parsedImageUrls,
            timeAgo: this.getTimeAgo(new Date(incident.created_at))
          };
        });
      },
      error: (error) => {
        console.error('Error fetching incidents:', error);
      }
    });
  }


  selectedFileNames: string = 'No files selected';


  selectedFiles: File[] = [];

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFiles = Array.from(input.files);
      this.selectedFileNames = this.selectedFiles.map(file => file.name).join(', ');
    } else {
      this.selectedFileNames = 'No files selected';
    }
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
        this.successMessage = '✅ Incident created successfully!';
      },
      error: (err) => {
        this.isLoading = false;
        this.errorMessage = err?.error?.message || 'Incident reporting failed! Please try again.';
      }
    });
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

  deleteIncident(incident: Incidents): void {
    this.incidentsService.delete(incident).subscribe({
      next: () => {
        console.log(`Incident ${incident.incidentId} deleted successfully`);
        this.incidents = this.incidents.filter(i => i.incidentId !== incident.incidentId); // Update UI
      },
      error: (err) => console.error('Delete failed:', err)
    });
  }

}
