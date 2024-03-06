import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Evenement } from '../../models/evenement';
import { EvenementUpDTO } from '../DTO/evenement-up-dto';
import { EvenementSearchUpDTO } from '../DTO/evenement-search-up-dto';

@Injectable({
  providedIn: 'root',
})
export class EvenementService {
  private evenementsUrl = 'Evenements'; // URL to AzureFunction

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  /** GET Evenements from the server*/
  getEvenements(): Observable<Evenement[]> {
    return this.http.get<Evenement[]>(
      `${environment.apiUrl}${this.evenementsUrl}`
    );
  }

  /** GET evenement by ID from the server */
  getEvenementById(id: number): Observable<Evenement> {
    const url = `${environment.apiUrl}${this.evenementsUrl}/${id}`;
    return this.http.get<Evenement>(url);
  }
  
  /** Search evenements based on a search term */
  searchEvenements(searchTerm: EvenementSearchUpDTO): Observable<Evenement[]> {
    return this.http.post<Evenement[]>(`${environment.apiUrl}${this.evenementsUrl}/Searches`,searchTerm,this.httpOptions);
  }

  /** POST: add a new evenement to the server*/
  addEvenement(
    titre: string,
    description: string,
    dateEvent: string | null,
    timeEvent: string | null,
    lieu: string
  ): Observable<EvenementUpDTO> {
    let evenementUpDTO: EvenementUpDTO = {
      titre: titre,
      description: description,
      dateEvent: dateEvent,
      timeEvent: timeEvent,
      lieu: lieu,
    };
    return this.http.post<EvenementUpDTO>(
      `${environment.apiUrl}${this.evenementsUrl}`,
      evenementUpDTO,
      this.httpOptions
    );
  }

  /** DELETE: delete de evenement*/
  deleteEvenement(id: number): Observable<Evenement> {
    const url = `${environment.apiUrl}${this.evenementsUrl}/${id}`;
    return this.http.delete<Evenement>(url, this.httpOptions);
  }

  /** PUT: update evenement on the server */
  updateEvenement(evenement: Evenement): Observable<Evenement> {
    const url = `${environment.apiUrl}${this.evenementsUrl}`;
    return this.http.put<Evenement>(url, evenement, this.httpOptions).pipe(
      catchError((error) => {
        console.error('Error updating evenement:', error);
        throw error;
      })
    );
  }
}
