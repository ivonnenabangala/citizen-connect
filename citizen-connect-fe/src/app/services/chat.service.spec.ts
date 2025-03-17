import { TestBed } from '@angular/core/testing';
import { ChatService } from './chat.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ChatService', () => {
  let service: ChatService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
        })
        .compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
