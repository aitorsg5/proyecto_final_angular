import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit {
  menuVisible = false; 
  userName: string = '';
  userEmail: string = '';
  isGuest: boolean = true; // Por defecto, modo invitado

  constructor(private router: Router, private userService: UsuarioService) {} 

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe(usuario => {
      if (usuario) {
        this.userName = usuario.name;
        this.userEmail = usuario.email;
        this.isGuest = false; // Usuario autenticado
      } else {
        this.activarModoInvitado();
      }
    });
  }

  activarModoInvitado(): void {
    this.userName = 'Invitado';
    this.userEmail = 'invitado@example.com';
    this.isGuest = true;

    console.log("Modo invitado activado. Limitando funcionalidades...");
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  editName(): void {
    this.router.navigate(['/Perfil']); 
  }

  editEmail(): void {
    console.log('Poner tu correo');
  }
login(): void {
  console.log("Redirigir a la página de inicio de sesión...");
  this.router.navigate(['/login']); // Asegúrate de que '/login' es la ruta correcta
}

  logout(): void {
    this.userService.logout(); // Asegura que la sesión se cierre correctamente
    this.activarModoInvitado(); // Cambia a modo invitado después de cerrar sesión
  }
}