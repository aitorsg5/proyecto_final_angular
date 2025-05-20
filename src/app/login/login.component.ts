import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
  @Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  usuarioInput: string = '';
  passwordInput: string = '';
  isMuted: boolean = true; // Variable para controlar muteo del video

  constructor(private usuarioService: UsuarioService, private router: Router) {}

  ngOnInit(): void {
    this.setupVideo();
  }

  ngAfterViewInit(): void {
    this.setupVideo();
  }

  setupVideo(): void {
    const video: HTMLVideoElement = <HTMLVideoElement>document.getElementById('myVideo');
    if (video) {
      video.muted = this.isMuted;
      video.play().catch(error => console.error("Error al reproducir el video:", error));

      video.addEventListener('click', () => this.toggleMute(video));
    }
  }

  toggleMute(video: HTMLVideoElement): void {
    this.isMuted = !this.isMuted;
    video.muted = this.isMuted;
  }

 verificarCredenciales(): void {
  const usuario = { email: this.usuarioInput, password: this.passwordInput };

  this.usuarioService.login(usuario).subscribe(
    usuarioAutenticado => {
      this.usuarioService.setUsuarioAutenticado(usuarioAutenticado); // Guarda usuario autenticado
      alert('¡Inicio de sesión exitoso!');
          this.router.navigate(['/index']);

    },
    error => {
      alert('Credenciales incorrectas');
      console.error('Error de autenticación:', error);
    }
  );
}

  irARegistro(): void {
    this.router.navigate(['/register']);
  }

  irAadmin(): void {
    this.router.navigate(['/usuarios']);
  }

  irAindex(): void {
    this.router.navigate(['/index']);
  }
}
