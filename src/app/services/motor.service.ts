import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Motor } from '../models/motor';
@Injectable({
  providedIn: 'root'
})
export class MotorService {
  private baseUrl = 'http://127.0.0.1:8000/api/motor';

  constructor(private http: HttpClient) {}

  getMotor(): Observable<Motor[]> {
    return this.http.get<Motor[]>(this.baseUrl);
  }
}
