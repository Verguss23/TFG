export class Gasto {
    _id?: number;
    concepto: string;
    monto: number;
    fecha: Date;
    categoria: string;

  
    constructor(concepto: string, monto: number, fecha: Date, categoria: string) {
      this.concepto = concepto;
      this.monto = monto;
      this.fecha = fecha;
      this.categoria = categoria;
    }
  }