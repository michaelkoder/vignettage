import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from '@angular/common'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { allProductsComponent } from './pages/allProducts/allProducts.component';
import { AvantagesComponent } from './pages/avantages/avantages.component';
import { HttpClientModule } from '@angular/common/http';
import { PointDeVenteComponent } from './pages/point-de-vente/point-de-vente.component';
import { FaqComponent } from './pages/faq/faq.component';

@NgModule({
  declarations:[
    AppComponent,
    HeaderComponent,
    HomeComponent,
    ProductsComponent,
    allProductsComponent,
    AvantagesComponent,
    PointDeVenteComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/'},
    { provide: LocationStrategy, useClass: HashLocationStrategy }  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
