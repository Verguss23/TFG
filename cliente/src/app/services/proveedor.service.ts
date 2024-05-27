import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from '../models/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  url = 'http://localhost:4000/api/proveedores/';

  constructor(private http: HttpClient) { }

  getProveedores(): Observable<any> {
    return this.http.get(this.url);
   }
 
   guardarProveedor(proveedor: Proveedor): Observable<any> {
     return this.http.post(this.url, proveedor);
   }

   eliminarProveedor(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerProveedor(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarProveedor(id: any, proveedor: Proveedor): Observable<any> {
    return this.http.put(this.url + id, proveedor);
  }
}
