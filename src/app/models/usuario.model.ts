export class Usuario {
  
      name: string;
  email: string;
  password: string; // Cambiado a `password`


  constructor(
    name: string,
    email: string,
    password: string,

  ) {
    this.name = name;
    this.email = email;
    this.password = password; // Asignamos `password` a la propiedad

  }
}
