import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedinCardComponent } from './linkedin-card.component';

describe('LinkedinCardComponent', () => {
  let component: LinkedinCardComponent;
  let fixture: ComponentFixture<LinkedinCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkedinCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkedinCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});