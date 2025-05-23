import { Usuario } from './usuario.model';
import { Coche } from './coche';
import { Kit } from './kit';
import { Caja } from './caja';
import { Modelo } from './modelo';
import { Motor } from './motor';

export class Cesta {
  id?: number;
user_id?: number;
  coche_id?: number;
  kit_id?: number;
  caja_id?: number;
  modelo_id?: number;
  motor_id?: number;
  precio_total?: number;

  Usuario?: Usuario;
  coche?: Coche;
  kit?: Kit;
  caja?: Caja;
  modelo?: Modelo;
  motor?: Motor;

  constructor(init?: Partial<Cesta>) {
    Object.assign(this, init);
  }
}
