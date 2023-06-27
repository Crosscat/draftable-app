import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FileItem, FileUploader, FileUploaderOptions } from 'ng2-file-upload';

import { Card } from '../interfaces/card.interface';
import { NewDraftRequest } from '../interfaces/draft-request.interface';
import { NewPlayerRequest } from '../interfaces/player.interface';
import { closeCreateDraftMenu, createNewDraft, joinExistingDraft, openCreateDraftMenu } from '../state/draft-setup.actions';
import { DraftSetupState } from '../state/draft-setup.reducer';
import { isSettingUpDraft } from '../state/draft-setup.selectors';

@Component({
  selector: 'app-draft-setup',
  templateUrl: './draft-setup.component.html',
  styleUrls: ['./draft-setup.component.css']
})
export class DraftSetupComponent implements OnInit, OnDestroy {
  public isSettingUpNewDraft$ = this.store.select(isSettingUpDraft);
  public form: FormGroup;

  private readonly fileUploadOptions: FileUploaderOptions = { url: '' };
  public cubeUploader = new FileUploader(this.fileUploadOptions);

  private unsubscribe$ = new Subject<void>();
  private cube: Card[] = [];

  constructor(
    private readonly store: Store<DraftSetupState>,
    private readonly formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      playerName: ['', Validators.required],
      draftId: ['', Validators.required],
      cube: [null],
      cardsPerPlayer: [45],
      draftType: ['Grid'],
      minPlayers: ['2'],
      maxPlayers: ['2'],
    });

    const reader = new FileReader();
    reader.onload = (e) => {
      this.cube = JSON.parse(e.target?.result as string);
    };

    this.cubeUploader.onAfterAddingFile = (fileItem: FileItem) => {
      reader.readAsText(fileItem._file);
    };
  }

  ngOnInit(): void {
    this.isSettingUpNewDraft$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        ['cube', 'cardsPerPlayer', 'draftType', 'minPlayers', 'maxPlayers'].forEach(x => {
          if (value) {
            this.form.get(x)?.setValidators(Validators.required);
          } else {
            this.form.get(x)?.setValidators(null);
          }
        });
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public openCreateDraftMenu() {
    this.store.dispatch(openCreateDraftMenu());
  }

  public closeCreateDraftMenu() {
    this.store.dispatch(closeCreateDraftMenu());
  }

  public createNewDraft() {
    if (!this.form.valid || this.cube.length === 0) return;
    
    const playerRequest = this.getPlayerRequest();
    const draftRequest = this.getDraftRequest();
    this.store.dispatch(createNewDraft({ playerRequest, draftRequest }));
  }

  public joinExistingDraft() {
    if (!this.form.valid) return;

    const playerRequest = this.getPlayerRequest();
    this.store.dispatch(joinExistingDraft({ playerRequest, draftId: this.form.value.draftId }));
  }

  private getPlayerRequest(): NewPlayerRequest {
    const value = this.form.value;

    return {
      name: value.playerName,
    } as NewPlayerRequest;
  }

  private getDraftRequest(): NewDraftRequest {
    const form = this.form.value;

    return {
      cardsPerPlayer: form.cardsPerPlayer,
      cube: this.cube,
      draftId: this.form.value.draftId,
      draftType: form.draftType,
      minPlayers: form.minPlayers,
      maxPlayers: form.maxPlayers,
    } as NewDraftRequest;
  }
}
