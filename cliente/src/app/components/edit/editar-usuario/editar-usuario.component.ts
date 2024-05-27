import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../models/usuario';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  selector: 'app-editar-usuario',
  standalone: true,
  imports: [FormsModule, RouterLink, ReactiveFormsModule, HttpClientModule, CommonModule,],
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent implements OnInit {

  titulo = 'Editar usuario';
  usuarioForm: FormGroup;
  id: string | null;

  constructor(private router: Router, private aRouter: ActivatedRoute, private fb: FormBuilder, private usuarioService: UsuarioService, private _snackBar: MatSnackBar) {
    this.usuarioForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.id = this.aRouter.snapshot.paramMap.get('id');
  } 

  ngOnInit(): void {
    this.esEditar();
  }

  agregarUsuario() {

    const USUARIO: Usuario = {
      username: this.usuarioForm.get('username')?.value, 
      password: this.usuarioForm.get('password')?.value,
    }

    if (this.id !== null) {
      this.usuarioService.editarUsuario(this.id, USUARIO).subscribe(data => {
        this.mostrarNotificacion('El usuario fue editado con éxito!');
        this.router.navigate(['/configuracion']);
      }, error => {
        console.log(error);
        this.usuarioForm.reset();
      })
    } else {
      console.log(USUARIO);
      this.usuarioService.guardarUsuario(USUARIO).subscribe(data => {
        this.mostrarNotificacion('El usuario fue registrado con éxito!');
        this.router.navigate(['/configuracion']);
      }, error => {
        console.log(error);
        this.usuarioForm.reset();
      })
    }
  }

    esEditar() {

      if(this.id !== null) {
        this.titulo = 'Editar usuario';
        this.usuarioService.obtenerUsuario(this.id).subscribe(data => {       
          this.usuarioForm.setValue({
            username: data.username,
            password: data.password,
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
