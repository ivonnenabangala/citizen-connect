import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

import { SidenavComponent } from './sidenav.component';
import { LoginService } from '../../services/login.service'; 
import { param } from 'jquery';
import { of } from 'rxjs';

describe('SidenavComponent', () => {
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SidenavComponent],
      // declarations: [SidenavComponent],
      providers: [
        LoginService,
        {
          provide: ActivatedRoute,
          useValue: {params: of({})}
        }
      ] 
    }).compileComponents();

    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
