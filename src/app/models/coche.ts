import { Kit } from '../models/kit';
import { Modelo } from '../models/modelo';

export class Coche {
  constructor(
    public id?: number,
    public nombre: string = '',
    public kit?: Kit, // Relación con Kit
    public caja_id: number = 0,
    public modelo?: Modelo, // Relación con Modelo
    public motor_id: number = 0,
    public precio_basico: number = 0,
    public precio_total?: number,
    public imagenes_ruta?: string[]
  ) {}
}