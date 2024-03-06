import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeEvenementsComponent } from './liste-evenements/liste-evenements.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { EvenementCreationComponent } from './evenement-creation/evenement-creation.component';



@NgModule({
  declarations: [
    ListeEvenementsComponent,
    EvenementCreationComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserModule
  ]
})
export class EvenementModule { }
