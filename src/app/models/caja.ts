export class Caja {
  constructor(
    public id: number,
    public tipo: 'automatico' | 'manual',
    public traccion: 'quattro' | 'delantera',
    public precio: number
  ) {}
}
