import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { IncidentsService } from './incidents.service';

describe('IncidentsService', () => {
  let service: IncidentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HttpClient
    });
    service = TestBed.inject(IncidentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
