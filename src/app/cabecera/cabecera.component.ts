import { Component, OnInit, OnDestroy } from '@angular/core'; // 👈 Añade OnDestroy aquí
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Usuario } from '../models/usuario.model';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs'; // 👈 Añade esta importación

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.scss']
})
export class CabeceraComponent implements OnInit, OnDestroy { // 👈 Implementa OnDestroy
  menuVisible = false;
  userName: string = '';
  userEmail: string = '';
  isGuest: boolean = true;
private userSubscription: Subscription | undefined;

  constructor(private router: Router, private userService: UsuarioService, private authService: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe(usuario => {
      if (usuario) {
        this.userName = usuario.name;
        this.userEmail = usuario.email;
        this.isGuest = false;
      } else {
        this.activarModoInvitado();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  activarModoInvitado(): void {
    this.userName = 'Invitado';
    this.userEmail = 'invitado@example.com';
    this.isGuest = true;
    console.log("Modo invitado activado. Limitando funcionalidades...");
  }

 

  editName(): void {
    this.router.navigate(['/Perfil']);
  }

  registrarse(): void {
    this.router.navigate(['/register']);
  }

  Cesta(): void {
    this.router.navigate(['/Cesta']);
  }

  editEmail(): void {
    console.log('Poner tu correo');
  }

  login(): void {
    console.log("Redirigir a la página de inicio de sesión...");
    this.router.navigate(['/login']);
  }
  

toggleMenu() {
  this.menuVisible = !this.menuVisible;
}

closeMenu() {
  this.menuVisible = false;
}

  logout(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.activarModoInvitado();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error('Error al cerrar sesión:', err);
      }
    });
  }
}
