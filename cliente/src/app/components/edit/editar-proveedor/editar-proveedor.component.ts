import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Proveedor } from '../../../models/proveedor';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule, ],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.css'
})
export class EditarProveedorComponent implements OnInit {

  titulo = 'Editar proveedor';
  proveedorForm: FormGroup;
  id: string | null;

  constructor(private router: Router, private aRouter: ActivatedRoute, private fb: FormBuilder, private proveedorService: ProveedorService, private _snackBar: MatSnackBar) {
    this.proveedorForm = this.fb.group({
      nombre: ['', Validators.required],
      contacto: ['', Validators.required],
      telefono: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  } 

  ngOnInit(): void {
    this.esEditar();
  }

  agregarProveedor() {

    const PROVEEDOR: Proveedor = {
      nombre: this.proveedorForm.get('nombre')?.value, 
      contacto: this.proveedorForm.get('contacto')?.value,
      telefono: this.proveedorForm.get('telefono')?.value,
    }

    if (this.id !== null) {
      this.proveedorService.editarProveedor(this.id, PROVEEDOR).subscribe(data => {
        this.mostrarNotificacion('El gasto fue editado con éxito!');
        this.router.navigate(['/gestion-proveedores']);
      }, error => {
        console.log(error);
        this.proveedorForm.reset();
      })
    } else {
      console.log(PROVEEDOR);
      this.proveedorService.guardarProveedor(PROVEEDOR).subscribe(data => {
        this.mostrarNotificacion('El gasto fue registrado con éxito!');
        this.router.navigate(['/gestion-proveedores']);
      }, error => {
        console.log(error);
        this.proveedorForm.reset();
      })
    }
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar proveedor';
      this.proveedorService.obtenerProveedor(this.id).subscribe(data => {
        this.proveedorForm.setValue({
          nombre: data.nombre,
          contacto: data.contacto,
          telefono: data.telefono,
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
