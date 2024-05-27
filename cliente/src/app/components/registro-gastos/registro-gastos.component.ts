import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { Observable } from 'rxjs/internal/Observable';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { GastoService } from '../../services/gasto.service';
import { Gasto } from '../../models/gasto';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FooterComponent } from '../shared/footer/footer.component';
import { UsuarioService } from '../../services/usuario.service';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
  selector: 'app-registro-gastos',
  standalone: true,
  imports: [RouterLink, MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavContainer, MatSidenav, MatSidenavModule, MatListModule, MatDatepickerModule, CommonModule, MatTableModule, ReactiveFormsModule, HttpClientModule, FormsModule, RegistroGastosComponent, FooterComponent, MatTooltipModule, ],
  templateUrl: './registro-gastos.component.html',
  styleUrl: './registro-gastos.component.css'
})
export class RegistroGastosComponent implements OnInit{

  isExpanded = false;
  currentDate = new Date();

  gastoForm: FormGroup;
  listGastos: Gasto[] = [];
  id: string | null;

  constructor(private router: Router, private usuarioService: UsuarioService, private gastoService: GastoService, private fb: FormBuilder, private aRouter: ActivatedRoute, private snackBar: MatSnackBar) {
    this.gastoForm = this.fb.group({
      monto: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      concepto: ['', Validators.required],
      fecha: ['', Validators.required],
      categoria: ['', Validators.required]
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
   }

  ngOnInit(): void {
    this.obtenerGastos();
  }


  obtenerGastos() {
    this.gastoService.getGastos().subscribe(data => {
      this.listGastos = data;
    }, error => {
      console.log(error);
    })
  }

  agregarGasto() {

    const GASTO: Gasto = {
      concepto: this.gastoForm.get('concepto')?.value,
      monto: this.gastoForm.get('monto')?.value, 
      fecha: this.gastoForm.get('fecha')?.value,
      categoria: this.gastoForm.get('categoria')?.value,
    }

    console.log(GASTO);
    this.gastoService.guardarGasto(GASTO).subscribe(data => {
      this.mostrarNotificacion('Gasto creado con éxito!');
    }, error => {
      console.log(error);
      this.gastoForm.reset();
    })
  }

  eliminarGasto(id: any) {
    const confirmacion = confirm('¿Estás seguro de que quieres eliminar este gasto?');
    if (confirmacion) {
      this.gastoService.eliminarGasto(id).subscribe(data => {
        this.mostrarNotificacion('El gasto se ha eliminado con éxito!');
        this.obtenerGastos();
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

