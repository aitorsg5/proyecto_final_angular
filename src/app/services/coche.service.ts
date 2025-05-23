import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Coche } from '../models/coche';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  private apiUrl = 'http://127.0.0.1:8000/api/coches';
    public baseImageUrl = 'http://127.0.0.1:8000/storage/';


  private currentcocheSubject = new BehaviorSubject<Coche | null>(null);

  constructor(private http: HttpClient) {}



  getCoches(): Observable<Coche[]> {
    return this.http.get<Coche[]>(this.apiUrl);
  }

  getCocheById(id: number): Observable<Coche> {
    return this.http.get<Coche>(`${this.apiUrl}/${id}`);
  }

  createCoche(coche: Coche): Observable<Coche> {
    return this.http.post<Coche>(this.apiUrl, coche);
  }

  updateCoche(id: number, coche: Partial<Coche>): Observable<Coche> {
    return this.http.put<Coche>(`${this.apiUrl}/${id}`, coche);
  }

  deleteCoche(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}