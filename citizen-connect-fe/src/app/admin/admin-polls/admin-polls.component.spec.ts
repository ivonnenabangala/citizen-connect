import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { AdminPollsComponent } from './admin-polls.component';
import { PollsService } from '../../services/polls.service'; // Import PollsService

describe('AdminPollsComponent', () => {
  let component: AdminPollsComponent;
  let fixture: ComponentFixture<AdminPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HttpClient
      declarations: [AdminPollsComponent], // Declare component
      providers: [PollsService] // Provide PollsService
    }).compileComponents();

    fixture = TestBed.createComponent(AdminPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
