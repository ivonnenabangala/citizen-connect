import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscussionsComponent } from './admin-discussions.component';

describe('AdminDiscussionsComponent', () => {
  let component: AdminDiscussionsComponent;
  let fixture: ComponentFixture<AdminDiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDiscussionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDiscussionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
