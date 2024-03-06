import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { Evenement } from '../models/evenement';
import { EvenementSearchUpDTO } from '../services/DTO/evenement-search-up-dto';
import { EvenementService } from '../services/evenement/evenement.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {
	evenements: Evenement[] = [];
	searchEvenement: EvenementSearchUpDTO = {
  titre: ''
};

constructor(private evenementService: EvenementService, private router: Router) { }
  
  /** Initializes the component by loading evenements. */
  ngOnInit(): void {
	  this.loadEvenements();
	}
	
	
	/** Loads evenements from the server and filters them based on the search evenement title. */
	loadEvenements(): void {
  
	  if (this.searchEvenement.titre) {
		console.log('Filtered evenements:', this.searchEvenement.titre);
		this.evenementService.searchEvenements(this.searchEvenement)
		.pipe(
		  map((evenements: Evenement[]) => {
			return evenements.map((evenement: Evenement) => {
			  evenement.dateEvent = formatDate(new Date(evenement.dateEvent), 'yyyy-MM-dd', 'en-US');
			  return evenement;
			});
		  })
		)
		.subscribe({
		  next: (evenements: Evenement[]) => {
			this.evenements = evenements;
		  },
		  error: (error) => {
			console.error('Error during evenement search:', error);
		  }
		});
	  } else {
		this.evenementService.getEvenements()
		.subscribe({
		  next: (evenements: Evenement[]) => {
			console.log('Données des évènements :', evenements);
			this.evenements = evenements;
		  },
		  error: (error) => {
			console.error('Erreur lors de la récupération des évènements :', error);
		  }
		});
	  }
	}
}
