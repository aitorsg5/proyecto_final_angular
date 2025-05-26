import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CocheService } from '../services/coche.service';
import { MotorService } from '../services/motor.service';
import { KitService } from '../services/kit.service';
import { CajaService } from '../services/caja.service';
import { CestaService } from '../services/cesta.service';
import { AuthService } from '../services/auth.service';
import { UsuarioService } from '../services/usuario.service';


import { Coche } from '../models/coche';
import { Kit } from '../models/kit';
import { Caja } from '../models/caja';
import { Motor } from '../models/motor';
import { Cesta } from '../models/cesta';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent implements OnInit {
  baseImageUrl: string;

  coche!: Coche;
  form!: FormGroup;

  kits: Kit[] = [];
  cajas: Caja[] = [];
  motores: Motor[] = [];

  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cocheService: CocheService,
    private motorService: MotorService,
    private kitService: KitService,
    private cajaService: CajaService,
    private cestaService: CestaService,
    private authService: AuthService,
    private usuarioService: UsuarioService,





  ) {
        this.baseImageUrl = this.cocheService.baseImageUrl;

  }

  ngOnInit(): void {
    //  this.user_id = this.authService.getUserId()!;

    this.loadOptions();  // Cargar listas para selects
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.cocheService.getCocheById(id).subscribe({
      next: coche => {
        this.coche = coche;
        this.initForm();
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar el coche.';
        this.loading = false;
      }
    });
  }

 loadOptions() {
  this.kitService.getKits().subscribe({
    next: kits => this.kits = kits,
    error: () => this.error = 'Error cargando kits'
  });

  this.cajaService.getCaja().subscribe({
    next: cajas => this.cajas = cajas,
    error: () => this.error = 'Error cargando cajas'
  });

  this.motorService.getMotor().subscribe({
    next: motores => this.motores = motores,
    error: () => this.error = 'Error cargando motores'
  });
}
imagenIndex = 0;

prevImage() {
  if (!this.coche?.imagenes_ruta) return;

  this.imagenIndex = (this.imagenIndex - 1 + this.coche.imagenes_ruta.length) % this.coche.imagenes_ruta.length;
}

nextImage() {
  if (!this.coche?.imagenes_ruta) return;

  this.imagenIndex = (this.imagenIndex + 1) % this.coche.imagenes_ruta.length;
}



  initForm() {
    this.form = this.fb.group({
      kit_id: [this.coche.kit?.id || null],
      caja_id: [this.coche.caja_id],
      motor_id: [this.coche.motor_id]
    });
  }

guardar() {
  const usuarioStr = localStorage.getItem('currentUser');
  const usuario = usuarioStr ? JSON.parse(usuarioStr) : null;
  const userId = usuario ? usuario.id : null;

  if (!userId) {
    this.error = 'Debes estar logueado para guardar.';
    return;
  }

  const nuevaCesta = {
    user_id: userId,
    coche_id: this.coche.id!,
    kit_id: this.form.value.kit_id,
    caja_id: this.form.value.caja_id,
    modelo_id: this.coche.modelo?.id,
    motor_id: this.form.value.motor_id,
    precio_total: this.coche.precio_total ?? 0 // Si tienes el precio total calculado
  };

  console.log('Datos a enviar:', nuevaCesta);

  this.cestaService.createCesta(nuevaCesta).subscribe({
    next: () => {
      this.router.navigate(['/Cesta']);
    },
    error: (err) => {
      this.error = 'Error al guardar la cesta: ' + (err.error?.message || err.message);
      console.error(err);
    }
  });
}




}
