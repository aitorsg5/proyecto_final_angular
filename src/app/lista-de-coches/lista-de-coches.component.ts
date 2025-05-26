import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CocheService } from '../services/coche.service';
import { Coche } from '../models/coche';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-de-coches',
  templateUrl: './lista-de-coches.component.html',
  styleUrls: ['./lista-de-coches.component.scss']
})
export class ListaDeCochesComponent implements OnInit, AfterViewInit {
  coches: Coche[] = [];
  baseImageUrl: string;

  modelosUnicos: string[] = [];
  currentModelFilter: string = 'Todos';

  currentIndex = 0;

  constructor(
    private cocheService: CocheService,
    private router: Router
  ) {
    this.baseImageUrl = this.cocheService.baseImageUrl;
  }

  ngOnInit(): void {
    this.cocheService.getCoches().subscribe(data => {
      this.coches = data;

      const modelos = data
        .map(coche => coche.modelo?.nombre)
        .filter((nombre): nombre is string => nombre !== undefined && nombre !== null);
      this.modelosUnicos = Array.from(new Set(modelos));
    });
  }

  ngAfterViewInit(): void {
  }

  get cochesMostrados(): Coche[] {
    if (this.currentModelFilter === 'Todos') return this.coches;
    return this.coches.filter(coche => coche.modelo?.nombre === this.currentModelFilter);
  }

  filtrarPorModelo(modelo: string): void {
    this.currentModelFilter = modelo;
  }

  irConfiguracion(id?: number): void {
    if (id == null) {
      console.error('El ID del coche es inválido');
      return;
    }
    this.router.navigate(['/configuracion', id]);
  }

  nextSlide(): void {
    const slider = document.getElementById('slider') as HTMLElement;
    const container = document.querySelector('.slider-container') as HTMLElement;
    if (!slider || !container) {
      console.warn('Slider or container element not found for nextSlide.');
      return;
    }

    const slideWidth = container.offsetWidth;
    this.currentIndex++;
    slider.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
  }
}
