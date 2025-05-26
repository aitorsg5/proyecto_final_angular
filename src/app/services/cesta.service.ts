import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cesta } from '../models/cesta';

@Injectable({
  providedIn: 'root'
})
export class CestaService {
  private apiUrlgets = 'http://127.0.0.1:8000/api/cestas_get';
  private apiUrlpost = 'http://127.0.0.1:8000/api/cestas_post';
  private apiUrlupdate = 'http://127.0.0.1:8000/api/cestas/{id}';
  private apiUrlget = 'http://127.0.0.1:8000/api/cestas_get/{id}';
private apiUrlDelete = 'http://127.0.0.1:8000/api/cestas_delet';





  constructor(private http: HttpClient) {}

  // Obtener todas las cestas
  getCestas(): Observable<Cesta[]> {
    return this.http.get<Cesta[]>(this.apiUrlgets);
  }

  // Obtener una cesta por id
  getCesta(id: number): Observable<Cesta> {
    return this.http.get<Cesta>(`${this.apiUrlget}/${id}`);
  }

  // Crear una nueva cesta
  createCesta(cesta: Cesta): Observable<Cesta> {
    return this.http.post<Cesta>(this.apiUrlpost, cesta);
  }

  // Actualizar una cesta existente
  updateCesta(id: number, cesta: Partial<Cesta>): Observable<Cesta> {
    return this.http.put<Cesta>(`${this.apiUrlupdate}/${id}`, cesta);
  }

  // Eliminar una cesta
  deleteCesta(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrlDelete}/${id}`);
  }
}
