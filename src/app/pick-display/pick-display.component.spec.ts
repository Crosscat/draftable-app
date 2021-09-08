import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickDisplayComponent } from './pick-display.component';

describe('PickDisplayComponent', () => {
  let component: PickDisplayComponent;
  let fixture: ComponentFixture<PickDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
