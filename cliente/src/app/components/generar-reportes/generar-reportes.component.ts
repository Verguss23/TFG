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
import { FooterComponent } from "../shared/footer/footer.component";
import { Reporte } from '../../models/reporte';
import { ReporteService } from '../../services/reporte.service';
import { UsuarioService } from '../../services/usuario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-generar-reportes',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenav, MatSidenavContainer, MatListModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, CommonModule, MatSidenavContent, FooterComponent, MatTooltipModule, ],
  templateUrl: './generar-reportes.component.html',
  styleUrl: './generar-reportes.component.css'
})
export class GenerarReportesComponent implements OnInit {

  isExpanded = false;
  currentDate = new Date();

  reporteForm: FormGroup;
  listReportes: Reporte[] = [];
  id: string | null;

  constructor(private router: Router, private reporteService: ReporteService, private fb: FormBuilder, private aRouter: ActivatedRoute, private snackBar: MatSnackBar, private usuarioService: UsuarioService) {
    this.reporteForm = this.fb.group({
      tipo: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.obtenerReportes();
  }

  obtenerReportes() {
    this.reporteService.getReportes().subscribe(data => {
      this.listReportes = data;
    }, error => {
      console.log(error);
    })
  }

  agregarReporte() {

    const REPORTE: Reporte = {
      tipo: this.reporteForm.get('tipo')?.value, 
      inicio: this.reporteForm.get('inicio')?.value,
      fin: this.reporteForm.get('fin')?.value,
    }

    this.reporteService.guardarReporte(REPORTE).subscribe(data => {
      this.mostrarNotificacion('Reporte creado con éxito!');
    }, error => {
      console.log(error);
      this.reporteForm.reset();
    })
  }

  eliminarReporte(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este reporte?');
    if (confirmacion) {
      this.reporteService.eliminarReporte(id).subscribe(data => {
        this.mostrarNotificacion('El reporte se ha eliminado con éxito!');
        this.obtenerReportes();
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
