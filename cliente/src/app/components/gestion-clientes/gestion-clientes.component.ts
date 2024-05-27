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
import { ClienteService } from '../../services/cliente.service';
import { Cliente } from '../../models/cliente';
import { UsuarioService } from '../../services/usuario.service';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-gestion-clientes',
  standalone: true,
  imports: [RouterLink, MatIconModule, MatButtonModule, MatToolbarModule, MatSidenav, MatSidenavContainer, MatListModule, MatDatepickerModule, ReactiveFormsModule, FormsModule, CommonModule, MatSidenavContent, FooterComponent, MatTooltipModule, ],
  templateUrl: './gestion-clientes.component.html',
  styleUrl: './gestion-clientes.component.css'
})
export class GestionClientesComponent implements OnInit {

  isExpanded = false;
  currentDate = new Date();

  clienteForm: FormGroup;
  listClientes: Cliente[] = [];
  id: string | null;

  constructor(private router: Router, private clienteService: ClienteService, private fb: FormBuilder, private aRouter: ActivatedRoute, private snackBar: MatSnackBar, private usuarioService: UsuarioService) {
    this.clienteForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', Validators.required],
      telefono: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.obtenerClientes();
  }

  obtenerClientes() {
    this.clienteService.getClientes().subscribe(data => {
      this.listClientes = data;
    }, error => {
      console.log(error);
    })
  }

  agregarCliente() {

    const CLIENTE: Cliente = {
      nombre: this.clienteForm.get('nombre')?.value, 
      email: this.clienteForm.get('email')?.value,
      telefono: this.clienteForm.get('telefono')?.value,
    }

    console.log(CLIENTE);
    this.clienteService.guardarCliente(CLIENTE).subscribe(data => {
      this.mostrarNotificacion('Cliente creado con éxito!');
    }, error => {
      console.log(error);
      this.clienteForm.reset();
    })
  }

  eliminarCliente(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este cliente?');
    if (confirmacion) {
      this.clienteService.eliminarCliente(id).subscribe(data => {
        this.mostrarNotificacion('El cliente se ha eliminado con éxito!');
        this.obtenerClientes();
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
