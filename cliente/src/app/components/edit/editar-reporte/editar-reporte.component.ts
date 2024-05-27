import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Reporte } from '../../../models/reporte';
import { ReporteService } from '../../../services/reporte.service';

@Component({
  selector: 'app-editar-reporte',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule,],
  templateUrl: './editar-reporte.component.html',
  styleUrl: './editar-reporte.component.css'
})
export class EditarReporteComponent implements OnInit {

  titulo = 'Editar reporte';
  reporteForm: FormGroup;
  id: string | null;

  constructor(private router: Router, private aRouter: ActivatedRoute, private fb: FormBuilder, private reporteService: ReporteService, private _snackBar: MatSnackBar) {
    this.reporteForm = this.fb.group({
      tipo: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  } 

  ngOnInit(): void {
    this.esEditar();
  }

  agregarReporte() {

    const REPORTE: Reporte = {
      tipo: this.reporteForm.get('tipo')?.value, 
      inicio: this.reporteForm.get('inicio')?.value,
      fin: this.reporteForm.get('fin')?.value,
    }

    if (this.id !== null) {
      this.reporteService.editarReporte(this.id, REPORTE).subscribe(data => {
        this.mostrarNotificacion('El reporte fue editado con éxito!');
        this.router.navigate(['/generar-reportes']);
      }, error => {
        console.log(error);
        this.reporteForm.reset();
      })
    } else {
      console.log(REPORTE);
      this.reporteService.guardarReporte(REPORTE).subscribe(data => {
        this.mostrarNotificacion('El reporte fue registrado con éxito!');
        this.router.navigate(['/generar-reportes']);
      }, error => {
        console.log(error);
        this.reporteForm.reset();
      })
    }
  }

    esEditar() {

      if(this.id !== null) {
        this.titulo = 'Editar reporte';
        this.reporteService.obtenerReporte(this.id).subscribe(data => {
          const fechaInicio = new Date(data.inicio).toISOString().split('T')[0];
          const fechaFin = new Date(data.fin).toISOString().split('T')[0];         
          this.reporteForm.setValue({
            tipo: data.tipo,
            inicio: fechaInicio,
            fin: fechaFin,
          })
        })
      }
    }

  mostrarNotificacion(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000, 
    });
  }

}
