import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CrearUsuarioComponent } from './components/crear-usuario/crear-usuario.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistroGastosComponent } from './components/registro-gastos/registro-gastos.component';
import { RegistroIngresosComponent } from './components/registro-ingresos/registro-ingresos.component';
import { GestionProveedoresComponent } from './components/gestion-proveedores/gestion-proveedores.component';
import { GestionClientesComponent } from './components/gestion-clientes/gestion-clientes.component';
import { GenerarReportesComponent } from './components/generar-reportes/generar-reportes.component';
import { ConfiguracionComponent } from './components/configuracion/configuracion.component';
import { EditarGastoComponent } from './components/edit/editar-gasto/editar-gasto.component';
import { NgModule } from '@angular/core';
import { EditarIngresoComponent } from './components/edit/editar-ingreso/editar-ingreso.component';
import { EditarProveedorComponent } from './components/edit/editar-proveedor/editar-proveedor.component';
import { EditarClienteComponent } from './components/edit/editar-cliente/editar-cliente.component';
import { EditarReporteComponent } from './components/edit/editar-reporte/editar-reporte.component';
import { EditarUsuarioComponent } from './components/edit/editar-usuario/editar-usuario.component';
import { AuthGuard, authGuard } from './auth.guard';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'crear-usuario', component: CrearUsuarioComponent },
    { path: 'editar-usuario/:id', component: EditarUsuarioComponent, canActivate: [AuthGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: 'registro-gastos', component: RegistroGastosComponent, canActivate: [AuthGuard] },
    { path: 'editar-gasto/:id', component:  EditarGastoComponent, canActivate: [AuthGuard] },
    { path: 'registro-ingresos', component: RegistroIngresosComponent, canActivate: [AuthGuard] },
    { path: 'editar-ingreso/:id', component:  EditarIngresoComponent, canActivate: [AuthGuard] },
    { path: 'gestion-proveedores', component: GestionProveedoresComponent, canActivate: [AuthGuard] },
    { path: 'editar-proveedor/:id', component: EditarProveedorComponent, canActivate: [AuthGuard] },
    { path: 'gestion-clientes', component: GestionClientesComponent, canActivate: [AuthGuard] },
    { path: 'editar-cliente/:id', component: EditarClienteComponent, canActivate: [AuthGuard] },
    { path: 'generar-reportes', component: GenerarReportesComponent, canActivate: [AuthGuard] },
    { path: 'editar-reporte/:id', component: EditarReporteComponent, canActivate: [AuthGuard] },
    { path: 'configuracion', component: ConfiguracionComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: '**', redirectTo: '', pathMatch: 'full' }
];
