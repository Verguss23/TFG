import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingreso } from '../models/ingreso';

@Injectable({
  providedIn: 'root'
})
export class IngresoService {

  url = 'http://localhost:4000/api/ingresos/';

  constructor(private http: HttpClient) { }

  getIngresos(): Observable<any> {
    return this.http.get(this.url);
   }
 
   guardarIngreso(ingreso: Ingreso): Observable<any> {
     return this.http.post(this.url, ingreso);
   }

   eliminarIngreso(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerIngreso(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarIngreso(id: any, ingreso: Ingreso): Observable<any> {
    return this.http.put(this.url + id, ingreso);
  }
}
