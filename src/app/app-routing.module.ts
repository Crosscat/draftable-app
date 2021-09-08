import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DraftSetupComponent } from './draft-setup/draft-setup.component';
import { AppComponent } from './app.component';
import { DraftWaitingComponent } from './draft-waiting/draft-waiting.component';

const routes = [
  { path: '', redirectTo: '/draft/setup', pathMatch: 'full' },
  { path: 'draft/setup', component: DraftSetupComponent },
  { path: 'draft/waiting', component: DraftWaitingComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forChild([{ children: routes, component: AppComponent, path: '' }]),
  ],
})
export class AppRoutingModule { }
