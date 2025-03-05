import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { DiscussionsService } from './discussions.service';
import { LoginService } from '../services/login.service'; // Import LoginService

describe('DiscussionsService', () => {
  let service: DiscussionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HttpClient
      providers: [DiscussionsService, LoginService] // Provide necessary services
    });

    service = TestBed.inject(DiscussionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
