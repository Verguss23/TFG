import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, HttpClientModule,],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
  
  }

  cerrarSesion(): void {
    if (this.usuarioService.isLoggedIn()) {
      this.usuarioService.logout();
      this.router.navigate(['/']);
    }
  }

}
