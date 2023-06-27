import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftWaitingComponent } from './draft-waiting.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('DraftWaitingComponent', () => {
  let component: DraftWaitingComponent;
  let fixture: ComponentFixture<DraftWaitingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftWaitingComponent ],
      providers: [
        provideMockStore(),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
