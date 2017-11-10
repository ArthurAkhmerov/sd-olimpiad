/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { MockRouter } from '../app-routing/router.mock';
import { MainPageComponent } from './main-page.component';
import { Cell } from '../classes/Cell';
import { DomainsService } from '../services/domains.service';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;

  beforeEach(async(() => {
    let mockRouter = new MockRouter();
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ MainPageComponent ],
      providers: [ 
        {
          provide: DomainsService,
          useValue: {
            findDomains() {}
          }
        },
        { provide: Router, useValue: mockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: Observable.of({ N: 10, M: 20})
            }
          }
        }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
