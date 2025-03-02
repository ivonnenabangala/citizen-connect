import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPollsComponent } from './admin-polls.component';

describe('AdminPollsComponent', () => {
  let component: AdminPollsComponent;
  let fixture: ComponentFixture<AdminPollsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminPollsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminPollsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
