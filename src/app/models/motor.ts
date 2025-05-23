export class Motor {
  constructor(
    public id: number,
    public motor: string,
    public combustible: string,
    public precio: number,
    public turbo: boolean,
    public cc: number
  ) {}
}
