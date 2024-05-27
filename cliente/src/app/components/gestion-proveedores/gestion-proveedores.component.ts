import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer, MatSidenavContent } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../models/proveedor';
import { ProveedorService } from '../../services/proveedor.service';
import { FooterComponent } from "../shared/footer/footer.component";
import { UsuarioService } from '../../services/usuario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-gestion-proveedores',
    standalone: true,
    templateUrl: './gestion-proveedores.component.html',
    styleUrl: './gestion-proveedores.component.css',
    imports: [RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenav, MatSidenavContainer, MatListModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, CommonModule, MatSidenavContent, FooterComponent, MatTooltipModule, ]
})
export class GestionProveedoresComponent implements OnInit {

  isExpanded = false;
  currentDate = new Date();

  proveedorForm: FormGroup;
  listProveedores: Proveedor[] = [];
  id: string | null;

  constructor(private router: Router, private proveedorService: ProveedorService, private fb: FormBuilder, private aRouter: ActivatedRoute, private snackBar: MatSnackBar, private usuarioService: UsuarioService) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.obtenerProveedores();
  }

  obtenerProveedores() {
    this.proveedorService.getProveedores().subscribe(data => {
      this.listProveedores = data;
    }, error => {
      console.log(error);
    })
  }

  agregarProveedor() {

    const PROVEEDOR: Proveedor = {
      nombre: this.proveedorForm.get('nombre')?.value, 
      contacto: this.proveedorForm.get('contacto')?.value,
      telefono: this.proveedorForm.get('telefono')?.value,
    }

    console.log(PROVEEDOR);
    this.proveedorService.guardarProveedor(PROVEEDOR).subscribe(data => {
      this.mostrarNotificacion('Proveedor creado con éxito!');
    }, error => {
      console.log(error);
      this.proveedorForm.reset();
    })
  }

  eliminarProveedor(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este proveedor?');
    if (confirmacion) {
      this.proveedorService.eliminarProveedor(id).subscribe(data => {
        this.mostrarNotificacion('El proveedor se ha eliminado con éxito!');
        this.obtenerProveedores();
      }, error => {
        console.log(error);
      });
    }
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

  mostrarNotificacion(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 2000, 
    });
  }

}
