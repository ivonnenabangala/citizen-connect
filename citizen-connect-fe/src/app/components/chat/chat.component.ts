import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../../services/chat.service';
@Component({
  selector: 'app-chat',
  imports: [
    MatToolbarModule, MatIconModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule,
    FormsModule, CommonModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit{
  form!: FormGroup
  documentId: string = '';
  documentUrl: string = '';
  query: string = '';
  response: string = '';
  responseMessage: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private chatService: ChatService
  ){
    this.form = this.formBuilder.group({
      text: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.documentId = params['id'];
    });

    this.route.queryParams.subscribe(params => {
      this.documentUrl = params['url'];
    });

    // Send document URL to backend for processing
    if (this.documentUrl) {
      this.chatService.processDocument(this.documentUrl, this.documentId).subscribe({
        next: () => console.log("Document processed successfully"),
        error: err => console.error("Error processing document:", err)
      });
    this.askQuestion();
    }
  }


  askQuestion() {
    if (!this.query.trim()) return;

    this.messages.push({ text: this.query, sender: 'user' });

    this.chatService.chatWithDocument(this.documentId, this.query).subscribe({
      next: (data) => {
        // console.log("AI Response:", data.response);

        this.messages.push({ text: data.response, sender: 'bot' });

        this.query = '';
      },
      error: (err) => {
        console.error("Error:", err);
      }
    });
  }
}
