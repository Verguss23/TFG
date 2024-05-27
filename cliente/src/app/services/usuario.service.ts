import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  url = 'http://localhost:4000/api/usuarios/';

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  validarUsuario(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.url + 'login', { username, password }).pipe(
      tap(response => {
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  getUsuarios(): Observable<any> {
   return this.http.get(this.url);
  }

  guardarUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.url, usuario);
  }
  
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(this.url + id);
  }

  obtenerUsuario(id: any): Observable<any> {
    return this.http.get(this.url + id);
  }

  editarUsuario(id: any, usuario: Usuario): Observable<any> {
    return this.http.put(this.url + id, usuario);
  }

  guardarConfiguracion(configuracion: any): Observable<any> {
    const url = `${this.url}configuracion`; 
    return this.http.post(url, configuracion);
  }

  obtenerConfiguracion(): Observable<any> {
    const url = `${this.url}configuracion`;
    return this.http.get(url);
  }

}
