import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Kit } from '../models/kit';

@Injectable({
  providedIn: 'root'
})
export class KitService {
  private baseUrl = 'http://127.0.0.1:8000/api/kit';

  constructor(private http: HttpClient) {}

  getKits(): Observable<Kit[]> {
    return this.http.get<Kit[]>(this.baseUrl);
  }
}
