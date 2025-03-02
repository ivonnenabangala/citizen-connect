import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DocumentsService } from '../../services/documents.service';
import { Documents } from '../../interfaces/documents';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent implements OnInit{
  readonly panelOpenState = signal(false);
  documents:Documents[] = []

  constructor(
    private documentsService: DocumentsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDocuments()
    // this.cdr.detectChanges()
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
}
