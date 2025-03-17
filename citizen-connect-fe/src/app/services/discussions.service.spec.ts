import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { DiscussionsService } from './discussions.service';

describe('DiscussionsService', () => {
  let service: DiscussionsService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
          imports: [HttpClientTestingModule]
        })
        .compileComponents();
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiscussionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
