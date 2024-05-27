import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { GastoService } from '../../../services/gasto.service';
import { HttpClientModule } from '@angular/common/http';
import { Gasto } from '../../../models/gasto';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-editar-gasto',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule, ],
  templateUrl: './editar-gasto.component.html',
  styleUrl: './editar-gasto.component.css'
})
export class EditarGastoComponent implements OnInit{

  titulo = 'Editar gasto';
  gastoForm: FormGroup;
  id: string | null;

  constructor(private router: Router, private aRouter: ActivatedRoute, private fb: FormBuilder, private gastoService: GastoService, private _snackBar: MatSnackBar) {
    this.gastoForm = this.fb.group({
      concepto: ['', Validators.required],
      monto: ['', Validators.required],
      fecha: ['', Validators.required],
      categoria: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  } 
  
  ngOnInit(): void {
    this.esEditar();
  }

  agregarGasto() {

    const GASTO: Gasto = {
      concepto: this.gastoForm.get('concepto')?.value,
      monto: this.gastoForm.get('monto')?.value, 
      fecha: this.gastoForm.get('fecha')?.value,
      categoria: this.gastoForm.get('categoria')?.value,
    }

    if (this.id !== null) {
      this.gastoService.editarGasto(this.id, GASTO).subscribe(data => {
        this.mostrarNotificacion('El gasto fue editado con éxito!');
        this.router.navigate(['/registro-gastos']);
      }, error => {
        console.log(error);
        this.gastoForm.reset();
      })
    } else {
      console.log(GASTO);
      this.gastoService.guardarGasto(GASTO).subscribe(data => {
        this.mostrarNotificacion('El gasto fue registrado con éxito!');
        this.router.navigate(['/registro-gastos']);
      }, error => {
        console.log(error);
        this.gastoForm.reset();
      })
    }
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar gasto';
      this.gastoService.obtenerGasto(this.id).subscribe(data => {
        const fechaTransformada = new Date(data.fecha).toISOString().split('T')[0];
        this.gastoForm.setValue({
          concepto: data.concepto,
          monto: data.monto,
          fecha: fechaTransformada,
          categoria: data.categoria,
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
