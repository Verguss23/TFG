import { Injectable } from '@angular/core';
import { Gasto } from '../models/gasto';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  url = 'http://localhost:4000/api/gastos/';

  constructor(private http: HttpClient) { }

  getGastos(): Observable<any> {
    return this.http.get(this.url);
   }
 
   guardarGasto(gasto: Gasto): Observable<any> {
     return this.http.post(this.url, gasto);
   }

   eliminarGasto(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerGasto(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarGasto(id: any, gasto: Gasto): Observable<any> {
    return this.http.put(this.url + id, gasto);
  }

}
