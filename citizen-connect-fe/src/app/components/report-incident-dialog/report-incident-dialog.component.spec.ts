import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidentDialogComponent } from './report-incident-dialog.component';

describe('ReportIncidentDialogComponent', () => {
  let component: ReportIncidentDialogComponent;
  let fixture: ComponentFixture<ReportIncidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportIncidentDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReportIncidentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
