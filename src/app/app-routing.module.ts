import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { allProductsComponent } from './pages/allProducts/allProducts.component';
import { AvantagesComponent } from './pages/avantages/avantages.component';
import { PointDeVenteComponent } from './pages/point-de-vente/point-de-vente.component';
import { FaqComponent } from './pages/faq/faq.component';

const routes: Routes = [
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'avantages',component:AvantagesComponent},
  {path:'pointsVente',component:PointDeVenteComponent},
  {path:'faq',component:FaqComponent},
  {path:'products',component:ProductsComponent},
  {path:'allproducts',component:allProductsComponent},
  {path:'home',component:HomeComponent},
  {path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ scrollPositionRestoration: 'top' } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
