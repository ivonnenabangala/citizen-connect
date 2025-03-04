import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DocumentsService } from '../../services/documents.service';
import { Documents } from '../../interfaces/documents';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-documents',
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentsComponent implements OnInit{
  readonly panelOpenState = signal(false);
  documents:Documents[] = []
  // documentId: string = '';
  // documentUrl: string = '';
  // query: string = '';
  // response: string = '';

  constructor(
    private documentsService: DocumentsService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    // this.route.params.subscribe(params => {
    //   this.documentId = params['id'];
    // });

    // this.route.queryParams.subscribe(params => {
    //   this.documentUrl = params['url'];
    // });

    // // Send document URL to backend for processing
    // if (this.documentUrl) {
    //   this.http.post('http://127.0.0.1:8000/process-document/', {
    //     document_url: this.documentUrl,
    //     document_id: this.documentId
    //   }).subscribe(response => console.log("Document processed:", response));
    // }
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
