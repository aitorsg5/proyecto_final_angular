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

  setSession(usuario: Usuario & { token: string }): void {
    localStorage.setItem('currentUser', JSON.stringify(usuario));
    localStorage.setItem('isLoggedIn', 'true');
  }

  getCurrentUser(): Observable<number | null> {
    return this.userSubject.asObservable();
  }

  login(id: number) {
    localStorage.setItem('currentUser', JSON.stringify({ id })); // unifica nombre
    this.userSubject.next(id);
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isLoggedIn');
    this.userSubject.next(null);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true';
  }

  getToken(): string | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user).token : null;
  }
}
