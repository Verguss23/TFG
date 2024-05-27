import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingreso } from '../../../models/ingreso';
import { IngresoService } from '../../../services/ingreso.service';


@Component({
  selector: 'app-editar-ingreso',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule, ],
  templateUrl: './editar-ingreso.component.html',
  styleUrl: './editar-ingreso.component.css'
})
export class EditarIngresoComponent implements OnInit {

  titulo = 'Editar ingreso';
  ingresoForm: FormGroup;
  id: string | null;

  constructor(private router: Router, private aRouter: ActivatedRoute, private fb: FormBuilder, private ingresoService: IngresoService, private _snackBar: MatSnackBar) {
    this.ingresoForm = this.fb.group({
      monto: ['', Validators.required],
      descripcion: ['', Validators.required],
      fecha: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  } 

  ngOnInit(): void {
    this.esEditar();
  }

  agregarIngreso() {

    const INGRESO: Ingreso = {
      monto: this.ingresoForm.get('monto')?.value, 
      descripcion: this.ingresoForm.get('descripcion')?.value,
      fecha: this.ingresoForm.get('fecha')?.value,
    }

    if (this.id !== null) {
      this.ingresoService.editarIngreso(this.id, INGRESO).subscribe(data => {
        this.mostrarNotificacion('El gasto fue editado con éxito!');
        this.router.navigate(['/registro-ingresos']);
      }, error => {
        console.log(error);
        this.ingresoForm.reset();
      })
    } else {
      console.log(INGRESO);
      this.ingresoService.guardarIngreso(INGRESO).subscribe(data => {
        this.mostrarNotificacion('El gasto fue registrado con éxito!');
        this.router.navigate(['/registro-ingresos']);
      }, error => {
        console.log(error);
        this.ingresoForm.reset();
      })
    }
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar ingreso';
      this.ingresoService.obtenerIngreso(this.id).subscribe(data => {
        const fechaTransformada = new Date(data.fecha).toISOString().split('T')[0];
        this.ingresoForm.setValue({
          monto: data.monto,
          descripcion: data.descripcion,
          fecha: fechaTransformada,
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
