import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reporte } from '../models/reporte';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {

  url = 'http://localhost:4000/api/reportes/';

  constructor(private http: HttpClient) { }

  getReportes(): Observable<any> {
    return this.http.get(this.url);
   }
 
   guardarReporte(reporte: Reporte): Observable<any> {
     return this.http.post(this.url, reporte);
   }

   eliminarReporte(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerReporte(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarReporte(id: any, reporte: Reporte): Observable<any> {
    return this.http.put(this.url + id, reporte);
  }

}
