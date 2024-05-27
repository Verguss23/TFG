import { Component, OnInit } from '@angular/core';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FooterComponent } from '../shared/footer/footer.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { response } from 'express';
import { error } from 'console';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenav, MatSidenavContainer, MatListModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, CommonModule, MatSidenavContent, FooterComponent, MatTooltipModule, ],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent implements OnInit {

  isExpanded = false;
  currentDate = new Date();

  usuarioForm: FormGroup;
  configuracionForm: FormGroup;
  listUsuarios: Usuario[] = [];
  id: string | null;

  constructor(private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService, private snackBar: MatSnackBar, private aRouter: ActivatedRoute) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');

    this.configuracionForm = this.fb.group({
      idioma: ['es'],
      tamañoTexto: ['normal'],
      recibirNotificaciones: [false],
      notificacionesEventos: [false],
      temaOscuro: [false]
    });
  }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.usuarioService.getUsuarios().subscribe(data => {
      this.listUsuarios = data;
    }, error => {
      console.log(error);
    })
  }

  eliminarUsuario(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este usuario?');
    if (confirmacion) {
      this.usuarioService.eliminarUsuario(id).subscribe(data => {
        this.mostrarNotificacion('El cliente se ha eliminado con éxito!');
        this.obtenerUsuarios();
      }, error => {
        console.log(error);
      });
    }
  }

  guardarConfiguracion(): void {
    if (this.configuracionForm.invalid) {
      return;
    }

    const configuracion = this.configuracionForm.value;
    this.usuarioService.guardarConfiguracion(configuracion)
      .subscribe(
        () => {
          console.log('Configuración guardada correctamente');
        },
        error => {
          console.error('Error al guardar la configuración:', error);
        }
      );
  }

  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
  }
  
  logout() {
    const confirmacion = confirm('¿Seguro que quieres cerrar sesión?');
    if (confirmacion) {
      if (this.usuarioService.isLoggedIn()) {
        this.usuarioService.logout();
        this.router.navigate(['/']);
      }
    }
  }

  mostrarNotificacion(message: string): void {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000
    });
  }

}

