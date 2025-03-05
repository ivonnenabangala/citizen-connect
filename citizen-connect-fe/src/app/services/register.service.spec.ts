import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { RegisterService } from './register.service';

describe('RegisterService', () => {
  let service: RegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Add this to provide HttpClient
    });
    service = TestBed.inject(RegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
