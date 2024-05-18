import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PinterestCardComponent } from './pinterest-card.component';

describe('PinterestCardComponent', () => {
  let component: PinterestCardComponent;
  let fixture: ComponentFixture<PinterestCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PinterestCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinterestCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});