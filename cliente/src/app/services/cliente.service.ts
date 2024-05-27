import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url = 'http://localhost:4000/api/clientes/';

  constructor(private http: HttpClient) { }

  getClientes(): Observable<any> {
    return this.http.get(this.url);
   }
 
   guardarCliente(cliente: Cliente): Observable<any> {
     return this.http.post(this.url, cliente);
   }

   eliminarCliente(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerCliente(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarCliente(id: any, cliente: Cliente): Observable<any> {
    return this.http.put(this.url + id, cliente);
  }

  
}
