export class Ingreso {
    _id?: number;
    monto: number;
    descripcion: string;
    fecha: Date;

  
    constructor(monto: number, descripcion: string, fecha: Date) {
      this.monto = monto;
      this.descripcion = descripcion;
      this.fecha = fecha;
    }
  }