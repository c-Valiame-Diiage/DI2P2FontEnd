import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EvenementUpDTO } from '../../services/DTO/evenement-up-dto';
import { EvenementService } from '../../services/evenement/evenement.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenement-creation',
  templateUrl: './evenement-creation.component.html',
  styleUrl: './evenement-creation.component.css',
})
export class EvenementCreationComponent {
  eventCreate: EvenementUpDTO = {
    titre: '',
    description: '',
    dateEvent: '',
    timeEvent: '',
    lieu: '',
  };

  createEventForm: FormGroup = new FormGroup({
    titre: new FormControl(this.eventCreate.titre, [Validators.required]),
    description: new FormControl(this.eventCreate.description, [Validators.required]),
    dateEvent: new FormControl(this.eventCreate.dateEvent, [Validators.required]),
    timeEvent: new FormControl(this.eventCreate.timeEvent, [Validators.required]),
    lieu: new FormControl(this.eventCreate.lieu, [Validators.required]),
  });
  
  constructor(private evenementService: EvenementService, private router: Router ){}
  
  add(): void {

    if (!this.createEventForm.invalid) {
      this.eventCreate.titre = this.createEventForm.value.titre;
      this.eventCreate.description = this.createEventForm.value.description;
      this.eventCreate.dateEvent = this.createEventForm.value.dateEvent;
      this.eventCreate.timeEvent = this.createEventForm.value.timeEvent;
      this.eventCreate.lieu = this.createEventForm.value.lieu;

      this.evenementService.addEvenement(this.eventCreate.titre, this.eventCreate.description, this.eventCreate.dateEvent, this.eventCreate.timeEvent, this.eventCreate.lieu).subscribe({
        next: () => {
			this.router.navigate(['/home']);
        },
        error: (error) => {
          console.log("error on the creation of event.")

        }
      });
    }
  }
}
