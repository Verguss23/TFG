import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente.service';


@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule,],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {

  titulo = 'Editar cliente';
  clienteForm: FormGroup;
  id: string | null;

  constructor(private router: Router, private aRouter: ActivatedRoute, private fb: FormBuilder, private clienteService: ClienteService, private _snackBar: MatSnackBar) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  } 

  ngOnInit(): void {
    this.esEditar();
  }

  agregarCliente() {

    const CLIENTE: Cliente = {
      nombre: this.clienteForm.get('nombre')?.value, 
      email: this.clienteForm.get('email')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
    }

    if (this.id !== null) {
      this.clienteService.editarCliente(this.id, CLIENTE).subscribe(data => {
        this.mostrarNotificacion('El cliente fue editado con éxito!');
        this.router.navigate(['/gestion-clientes']);
      }, error => {
        console.log(error);
        this.clienteForm.reset();
      })
    } else {
      console.log(CLIENTE);
      this.clienteService.guardarCliente(CLIENTE).subscribe(data => {
        this.mostrarNotificacion('El cliente fue registrado con éxito!');
        this.router.navigate(['/gestion-clientes']);
      }, error => {
        console.log(error);
        this.clienteForm.reset();
      })
    }
  }

  esEditar() {

    if(this.id !== null) {
      this.titulo = 'Editar cliente';
      this.clienteService.obtenerCliente(this.id).subscribe(data => {
        this.clienteForm.setValue({
          nombre: data.nombre,
          email: data.email,
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
