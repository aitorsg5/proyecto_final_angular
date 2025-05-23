import { Component, OnInit } from '@angular/core';
import { CestaService } from '../services/cesta.service';
import { Cesta } from '../models/cesta';

@Component({
  selector: 'app-cesta',
  templateUrl: './cesta.component.html',
  styleUrls: ['./cesta.component.scss']
})
export class CestaComponent implements OnInit {
  cestas: Cesta[] = [];
  loading = false;
  error = '';

  constructor(private cestaService: CestaService) {}

  ngOnInit(): void {
    this.cargarCestas();
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

  eliminarCesta(id: number): void {
    this.cestaService.deleteCesta(id).subscribe({
      next: () => this.cargarCestas(),
      error: () => this.error = 'Error al eliminar la cesta'
    });
  }
}
