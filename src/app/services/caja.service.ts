import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Caja } from '../models/caja';
@Injectable({
  providedIn: 'root'
})
export class CajaService {

  private baseUrl = 'http://127.0.0.1:8000/api/caja';

  constructor(private http: HttpClient) {}

  getCaja(): Observable<Caja[]> {
    return this.http.get<Caja[]>(this.baseUrl);
  }
}
