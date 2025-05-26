import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuarioActual: Usuario = {
    name: '',
    email: '',
    password: ''
  };

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuarioService.currentUser.subscribe(usuario => {
      if (usuario) {
        this.usuarioActual = { ...usuario }; // Clonamos para evitar modificar directamente el original
      }
    });
  }

actualizarPerfil(): void {
  this.usuarioService.updateUsuario(this.usuarioActual).subscribe({
    next: (response) => {
      console.log('Usuario actualizado:', response);
      localStorage.setItem('currentUser', JSON.stringify(response));
      this.usuarioService.setCurrentUser(response);
    },
    error: (err) => {
      console.error('Error al actualizar usuario:', err);
    }
  });
}

cancelarEdicion(): void {
  // Aquí decides qué hacer al cancelar, por ejemplo navegar a otra ruta
  this.router.navigate(['/']); // o la ruta que quieras
}
}
