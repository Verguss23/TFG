import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule, FormsModule, CommonModule, ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{

  usuario: Usuario = {
    username: '',
    password: ''
  }

  loginForm: FormGroup;

  constructor(private usuarioService: UsuarioService, private router: Router, private fb: FormBuilder, ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  login(): void {
    const { username, password } = this.loginForm.value; 
    this.usuarioService.validarUsuario(username, password).subscribe(
      (response: any) => {
        console.log('Inicio de sesión exitoso:', response);
        localStorage.setItem('token', response.token);
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.error ('Error al iniciar sesión:', error);
      }
    );
  }

}
