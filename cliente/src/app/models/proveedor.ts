export class Proveedor {
    _id?: number;
    nombre: string;
    contacto: string;
    telefono: string;

  
    constructor(nombre: string, contacto: string, telefono: string) {
      this.nombre = nombre;
      this.contacto = contacto;
      this.telefono = telefono;
    }
  }