import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UsuarioService } from '../../services/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crear-usuario',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, CrearUsuarioComponent, FormsModule, CommonModule, ],
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css'
})
export class CrearUsuarioComponent implements OnInit {

  usuarioForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private _usuarioService: UsuarioService, private _snackBar: MatSnackBar) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  ngOnInit(): void {
    
  }

  agregarUsuario() {

    const USUARIO: Usuario = {
      username: this.usuarioForm.get('username')?.value,
      password: this.usuarioForm.get('password')?.value,  
    }

    console.log(USUARIO);
    this._usuarioService.guardarUsuario(USUARIO).subscribe(data => {
      this.mostrarNotificacion('Usuario creado con éxito!');
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.usuarioForm.reset();
    })
  }

  mostrarNotificacion(message: string) {
    this._snackBar.open(message, 'Cerrar', {
      duration: 2000, 
    });
  }

}
