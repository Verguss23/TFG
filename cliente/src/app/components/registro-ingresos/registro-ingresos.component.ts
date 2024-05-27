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
import { Ingreso } from '../../models/ingreso';
import { IngresoService } from '../../services/ingreso.service';
import { FooterComponent } from "../shared/footer/footer.component";
import { UsuarioService } from '../../services/usuario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-registro-ingresos',
    standalone: true,
    templateUrl: './registro-ingresos.component.html',
    styleUrl: './registro-ingresos.component.css',
    imports: [RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenav, MatSidenavContainer, MatListModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, CommonModule, MatSidenavContent, FooterComponent, MatTooltipModule, ]
})
export class RegistroIngresosComponent implements OnInit{

  isExpanded = false;
  currentDate = new Date();

  ingresoForm: FormGroup;
  listIngresos: Ingreso[] = [];
  id: string | null;

  constructor(private router: Router, private ingresoService: IngresoService, private fb: FormBuilder, private aRouter: ActivatedRoute, private snackBar: MatSnackBar, private usuarioService: UsuarioService) {
    this.ingresoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

   ngOnInit(): void {
    this.obtenerIngresos();
   }

   obtenerIngresos() {
    this.ingresoService.getIngresos().subscribe(data => {
      this.listIngresos = data;
    }, error => {
      console.log(error);
    })
  }

  agregarIngreso() {

    const INGRESO: Ingreso = {
      monto: this.ingresoForm.get('monto')?.value, 
      descripcion: this.ingresoForm.get('descripcion')?.value,
      fecha: this.ingresoForm.get('fecha')?.value,
    }

    console.log(INGRESO);
    this.ingresoService.guardarIngreso(INGRESO).subscribe(data => {
      this.mostrarNotificacion('Gasto creado con éxito!');
    }, error => {
      console.log(error);
      this.ingresoForm.reset();
    })
  }

  eliminarIngreso(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este ingreso?');
    if (confirmacion) {
      this.ingresoService.eliminarIngreso(id).subscribe(data => {
        this.mostrarNotificacion('El gasto se ha eliminado con éxito!');
        this.obtenerIngresos();
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
