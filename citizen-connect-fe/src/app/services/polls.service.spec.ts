import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { PollsService } from './polls.service';

describe('PollsService', () => {
  let service: PollsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add this to provide HttpClient
    });
    service = TestBed.inject(PollsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
