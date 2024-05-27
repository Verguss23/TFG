import { ApplicationConfig } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { UsuarioService } from './services/usuario.service';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { LoginComponent } from './components/login/login.component';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule, PlatformLocation } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthGuard } from './auth.guard';
import {MatTooltipModule} from '@angular/material/tooltip';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withFetch()), RouterLink, ReactiveFormsModule, Router, HttpClientModule, UsuarioService, CrearUsuarioComponent, LoginComponent, HttpClientModule, NgModule, LoginComponent, MatIconModule, MatToolbarModule, MatButtonModule, MatSidenavModule, provideAnimationsAsync(), MatListModule, MatDatepickerModule, CommonModule, MatTableModule, MatSnackBar, AuthGuard, MatTooltipModule, ]
};
