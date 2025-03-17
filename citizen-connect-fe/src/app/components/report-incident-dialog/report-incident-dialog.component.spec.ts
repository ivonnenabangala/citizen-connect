import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportIncidentDialogComponent } from './report-incident-dialog.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatDialogRef } from '@angular/material/dialog';

describe('ReportIncidentDialogComponent', () => {
  let component: ReportIncidentDialogComponent;
  let fixture: ComponentFixture<ReportIncidentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportIncidentDialogComponent, HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: {} } 
      ]
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
