import { Component, AfterViewInit } from '@angular/core';
import { Usuario } from '../models/usuario.model';
import { UsuarioService } from '../services/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements AfterViewInit {
  nuevoUsuario: Usuario = {

    name: '',
    email: '',
    password: '',


  };
  isMuted: boolean = true; // Variable para mantener el estado de mute

  constructor(private usuariosService: UsuarioService, private router: Router, private route: ActivatedRoute) {}

  crearUsuario(): void {
    this.usuariosService.addUsuario1(this.nuevoUsuario).subscribe(
      response => {
        console.log('Usuario creado:', response);
        alert('Usuario registrado correctamente');
        this.irALogin(); // Navegar al login después de registrar
      },
      error => {
        console.error('Error al crear usuario:', error);
        alert('Hubo un error al registrar el usuario');
      }
    );
  }

  ngAfterViewInit(): void {
    this.setupVideo();
  }


  setupVideo(): void {
    const video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('myVideo');
    if (video) {
      video.muted = this.isMuted; // Asegúrate de que el video está silenciado inicialmente
      video.play().then(() => {
        console.log("Video playing successfully.");
      }).catch(error => {
        console.error("Error attempting to play the video:", error);
      });

      // Añadir un evento de clic para alternar mute
      video.addEventListener('click', () => {
        this.toggleMute(video);
      });
    }
  }

  toggleMute(video: HTMLVideoElement): void {
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

  irALogin(): void {
    this.router.navigate(['/login']);
  }

  cancelarRegistro(): void {
    this.nuevoUsuario = {

      name: '',
      email: '',
      password: '',


    };
  }
}
