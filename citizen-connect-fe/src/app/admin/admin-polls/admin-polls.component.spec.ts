// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { AdminPollsComponent } from './admin-polls.component';
// import { PollsService } from '../../services/polls.service';
// import { ActivatedRoute } from '@angular/router';
// import { of } from 'rxjs';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

// describe('AdminPollsComponent', () => {
//   let component: AdminPollsComponent;
//   let fixture: ComponentFixture<AdminPollsComponent>;
//   let pollsServiceSpy: jasmine.SpyObj<PollsService>;
//   let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

//   beforeEach(async () => {
//     // ✅ Mock PollsService with proper return values
//     pollsServiceSpy = jasmine.createSpyObj('PollsService', ['getPolls', 'createPoll', 'delete']);
  
//     // ✅ Ensure `getPolls` returns an observable array
//     pollsServiceSpy.getPolls.and.returnValue(of([]));
  
//     // ✅ Ensure `createPoll` returns an observable mock poll
//     pollsServiceSpy.createPoll.and.returnValue(of({ pollId: 1, question: 'Test Poll' }));
  
//     // ✅ Ensure `delete` returns an observable
//     pollsServiceSpy.delete.and.returnValue(of(null));
  
//     snackBarSpy = jasmine.createSpyObj('MatSnackBar', ['open']);
  
//     await TestBed.configureTestingModule({
//       imports: [
//         HttpClientTestingModule,
//         ReactiveFormsModule,
//         AdminPollsComponent, // ✅ Standalone component must be imported
//       ],
//       providers: [
//         { provide: PollsService, useValue: pollsServiceSpy },
//         { provide: ActivatedRoute, useValue: { params: of({}) } },
//         { provide: MatSnackBar, useValue: snackBarSpy },
//         FormBuilder,
//       ]
//     }).compileComponents();
  
//     fixture = TestBed.createComponent(AdminPollsComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
  

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   // it('should call createPoll when saving a poll', () => {
//   //   const mockPoll = { pollId: 1, question: 'Test Poll' };
  
//   //   // ✅ Ensure `createPoll` returns an observable
//   //   pollsServiceSpy.createPoll.and.returnValue(of(mockPoll));
  
//   //   // ✅ Set form value before calling `savePoll`
//   //   component.pollForm.setValue({ question: 'Test Poll' });
  
//   //   // ✅ Call `savePoll`
//   //   component.savePoll();
  
//   //   // ✅ Expect `createPoll` to have been called
//   //   expect(pollsServiceSpy.createPoll).toHaveBeenCalledWith('Test Poll', jasmine.any(Date));
//   // });
  
// });
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PollsService } from '../../services/polls.service';
import { LoginService } from '../../services/login.service';

describe('PollsService', () => {
  let service: PollsService;
  let mockLoginService: jasmine.SpyObj<LoginService>;

  beforeEach(() => {
    // Mock LoginService
    mockLoginService = jasmine.createSpyObj('LoginService', ['getToken']);
    mockLoginService.getToken.and.returnValue('mocked-token'); 

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],  
      providers: [
        PollsService,
        { provide: LoginService, useValue: mockLoginService },
      ],
    });

    service = TestBed.inject(PollsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
