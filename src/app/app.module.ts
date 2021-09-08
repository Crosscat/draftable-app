import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { SocketIoConfig, SocketIoModule } from 'ngx-socket-io';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { DraftSetupComponent } from './draft-setup/draft-setup.component';
import { DraftWaitingComponent } from './draft-waiting/draft-waiting.component';
import { DraftComponent } from './draft/draft.component';
import { PickDisplayComponent } from './pick-display/pick-display.component';
import { AppRoutingModule } from './app-routing.module';
import { effects, reducers } from './state';
import { EffectsModule } from '@ngrx/effects';
import { DraftService } from './services/draft.service';
import { HttpClientModule } from '@angular/common/http';
import { PlayerService } from './services/player.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DraftGatewayService } from './services/draft-gateway.service';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    DraftSetupComponent,
    DraftWaitingComponent,
    DraftComponent,
    PickDisplayComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreModule.forFeature('draftable', reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature(effects),
    SocketIoModule.forRoot(config),
    FileUploadModule,
  ],
  providers: [
    DraftGatewayService,
    DraftService,
    PlayerService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
