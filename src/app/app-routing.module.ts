import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { ListeEvenementsComponent } from './evenement/liste-evenements/liste-evenements.component';
import { EvenementCreationComponent } from './evenement/evenement-creation/evenement-creation.component';

const routes: Routes = [
  {
    path: 'evenements', component: ListeEvenementsComponent,
  },
  {
    path: 'evenementCreation', component: EvenementCreationComponent,
  },
  { path: 'home', component: HomePageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
