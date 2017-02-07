import { Routes, RouterModule } from '@angular/router';
import {ErroRoute} from "./erro/erro.routes";
import { ModuleWithProviders} from '@angular/core';


const appRoutes: Routes = [
  ...ErroRoute
];

export const appRoutingProviders: any[] = [
];

export const routing = RouterModule.forRoot(appRoutes);
