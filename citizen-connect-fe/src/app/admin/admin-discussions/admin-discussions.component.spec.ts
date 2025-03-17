import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDiscussionsComponent } from './admin-discussions.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('AdminDiscussionsComponent', () => {
  let component: AdminDiscussionsComponent;
  let fixture: ComponentFixture<AdminDiscussionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDiscussionsComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({})
          }
        }
      ]
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
