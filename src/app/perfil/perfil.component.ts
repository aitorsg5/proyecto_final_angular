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
  // Obtener el objeto completo del localStorage (con id)
  const usuarioCompletoStr = localStorage.getItem('currentUser');
  if (!usuarioCompletoStr) {
    console.error('No hay usuario guardado en localStorage');
    return;
  }

  // Parsear el objeto guardado, que sí tiene el id aunque el modelo Usuario no
  const usuarioCompleto = JSON.parse(usuarioCompletoStr);
  const idUsuario = usuarioCompleto.id;

  if (!idUsuario) {
    console.error('No se encontró el ID del usuario para actualizar');
    return;
  }

  // Llamar al servicio para actualizar, pasando el id separado y el objeto usuario sin id
  this.usuarioService.updateUsuario(idUsuario, this.usuarioActual).subscribe({
    next: (response) => {
      console.log('Usuario actualizado:', response);
      // Actualizar localStorage con la respuesta completa (que incluye id)
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
