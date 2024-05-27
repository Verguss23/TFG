export class Reporte {
    _id?: number;
    tipo: string;
    inicio: Date;
    fin: Date;

  
    constructor(tipo: string, inicio: Date, fin: Date) {
      this.tipo = tipo;
      this.inicio = inicio;
      this.fin = fin;
    }
  }