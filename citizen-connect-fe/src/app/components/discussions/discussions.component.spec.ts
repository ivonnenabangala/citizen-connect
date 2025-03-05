import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import this
import { DiscussionsComponent } from './discussions.component';
import { DiscussionsService } from '../../services/discussions.service'; // Import DiscussionsService
import { LoginService } from '../../services/login.service'; // Import LoginService

describe('DiscussionsComponent', () => {
  let component: DiscussionsComponent;
  let fixture: ComponentFixture<DiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Provide HttpClient
      declarations: [DiscussionsComponent], // Declare the component
      providers: [DiscussionsService, LoginService] // Provide necessary services
    }).compileComponents();

    fixture = TestBed.createComponent(DiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
