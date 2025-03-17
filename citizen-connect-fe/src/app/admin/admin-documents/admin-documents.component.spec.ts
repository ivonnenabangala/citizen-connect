import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminDocumentsComponent } from './admin-documents.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LoginService } from '../../services/login.service'; 

describe('AdminDocumentsComponent', () => {
  let component: AdminDocumentsComponent;
  let fixture: ComponentFixture<AdminDocumentsComponent>;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(async () => {
    // Mock LoginService
    mockLoginService = jasmine.createSpyObj('LoginService', ['getToken']);
    mockLoginService.getToken.and.returnValue('mocked-token');

    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, AdminDocumentsComponent], 
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ view: 'manage' }) // Mocking query parameters
          }
        },
        { provide: LoginService, useValue: mockLoginService } 
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
