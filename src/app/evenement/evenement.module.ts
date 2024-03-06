import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListeEvenementsComponent } from './liste-evenements/liste-evenements.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';



@NgModule({
  declarations: [
    ListeEvenementsComponent,
  ],
  imports: [
    CommonModule,
	FormsModule,
	BrowserModule
  ]
})
export class EvenementModule { }
