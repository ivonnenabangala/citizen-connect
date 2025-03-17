import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentsComponent } from './incidents.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IncidentsComponent', () => {
  let component: IncidentsComponent;
  let fixture: ComponentFixture<IncidentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IncidentsComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
