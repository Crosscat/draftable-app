import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { DraftSetupState } from '../state/draft-setup.reducer';

import { DraftSetupComponent } from './draft-setup.component';

describe('DraftSetupComponent', () => {
  let component: DraftSetupComponent;
  let fixture: ComponentFixture<DraftSetupComponent>;

  const initialState: DraftSetupState = {
    settingUpDraft: false,
    ownsDraft: false,
    draftId: '',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraftSetupComponent ],
      providers: [
        provideMockStore({ initialState }),
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
