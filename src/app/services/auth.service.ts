// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<number | null>(null);
constructor(private usuarioService: UsuarioService) { }

  


setSession(usuario: Usuario): void {
  localStorage.setItem('currentUser', JSON.stringify(usuario));
  localStorage.setItem('isLoggedIn', 'true');
  // Guarda el userId para recuperar luego
}

  getCurrentUser(): Observable<number | null> {
    return this.userSubject.asObservable();
  }
  

  login(id: number) {
    localStorage.setItem('user', JSON.stringify({ id }));
    this.userSubject.next(id);
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.userSubject.value !== null;
  }
}
