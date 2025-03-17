import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ChatComponent } from './chat.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChatService } from '../../services/chat.service';
import { FormBuilder } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let mockChatService: jasmine.SpyObj<ChatService>;

  beforeEach(async () => {
    mockChatService = jasmine.createSpyObj('ChatService', ['processDocument', 'chatWithDocument']);

    mockChatService.processDocument.and.returnValue(of({}));
    mockChatService.chatWithDocument.and.returnValue(of({ response: "Mock AI Response" }));

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ChatComponent],
      providers: [
        FormBuilder,
        { 
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: 'test-id' }), 
            queryParams: of({ url: 'http://example.com/doc.pdf' }) 
          }
        },
        { provide: ChatService, useValue: mockChatService } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call processDocument on init if documentUrl exists', () => {
    expect(mockChatService.processDocument).toHaveBeenCalledWith('http://example.com/doc.pdf', 'test-id');
  });

  it('should call chatWithDocument when askQuestion is triggered', () => {
    component.query = "What is AI?";
    component.askQuestion();
    expect(mockChatService.chatWithDocument).toHaveBeenCalledWith('test-id', "What is AI?");
  });
});
