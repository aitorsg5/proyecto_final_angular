import { Component, OnInit } from '@angular/core';
import { CestaService } from '../services/cesta.service';
import { Cesta } from '../models/cesta';
import { CocheService } from '../services/coche.service';
import { Coche } from '../models/coche';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { Subscription } from 'rxjs'; // 👈 Añade esta importación

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {
  cestas: Cesta[] = [];
  loading = false;
  error = '';
  baseImageUrl: string;
    coche!: Coche;
  userName: string = '';
  userEmail: string = '';
  isGuest: boolean = true;
private userSubscription: Subscription | undefined;

  constructor(private cestaService: CestaService, private cocheService: CocheService,private router: Router, private userService: UsuarioService,) {
        this.baseImageUrl = this.cocheService.baseImageUrl;

  }
    ngOnInit(): void {
    this.userSubscription = this.userService.currentUser.subscribe(usuario => {
      if (usuario) {
        this.userName = usuario.name;
        this.userEmail = usuario.email;
        this.isGuest = false;
            this.cargarCestas();
      } else {
        this.modoinvitado();
      }
    });
  }

 modoinvitado(): void {
    
    console.log("Modo invitado activado. Limitando funcionalidades...");
     this.router.navigate(['/']);
  }


  cargarCestas(): void {
    this.loading = true;
    this.cestaService.getCestas().subscribe({
      next: (data) => {
        this.cestas = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar la cesta';
        this.loading = false;
      }
    });
  }
obtenerImagenCoche(cesta: Cesta): string {
  const imagen = cesta?.coche?.imagenes_ruta?.[0];
  return imagen ? `http://localhost:8000/storage/${imagen}` : 'assets/default.jpg';
}

 eliminarCesta(id: number): void {
  if (confirm('¿Estás seguro de que quieres eliminar esta cesta?')) {
    this.cestaService.deleteCesta(id).subscribe({
      next: () => this.cargarCestas(),
      error: () => this.error = 'Error al eliminar la cesta'
    });
  }
}

  comprar(id: number): void {
  if (confirm('¿Estás seguro de que quieres comprar el coche?')) {
    
    this.cestaService.deleteCesta(id).subscribe({
      next: () => this.cargarCestas(),
      error: () => this.error = 'Error al eliminar la cesta'
    });
  }
}
  irConfiguracion(id?: number) {
  if (id == null) {
    console.error('El ID del coche es inválido');
    return;
  }
  this.router.navigate(['/configuracion', id]);
}
}
