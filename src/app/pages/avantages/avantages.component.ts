import { Component, OnInit } from '@angular/core';
import { VignettageService} from '../../services/vignettage.service'
import {Router} from '@angular/router';

@Component({
  selector: 'app-avantages',
  templateUrl: './avantages.component.html',
  styleUrls: ['./avantages.component.scss']
})
export class AvantagesComponent implements OnInit {

  constructor(private vignetteService:VignettageService,private router: Router) { }
  public vignettesService=this.vignetteService;
  public appInfos:any={};
  public avantagesProductsList:any=[];
  public avantagesProductsList_used:any=[];

  ngOnInit(): void {
    this.getDatas();
  }
  goHome(){
    this.router.navigateByUrl('/#/home');
  }
  getDatas(){
    let that =this;
    this.vignetteService.loadDatas().subscribe(data=>{
     this.appInfos=data;
     this.appInfos=this.appInfos['DONNEES'];
     // get list of products coupons
     
     let avantagesList=this.appInfos['Coupons'];
     let listProducts =this.appInfos['ProduitsOperation'];
     console.table(avantagesList)

     for( let i=0;i<listProducts.length;i++){
       let currentProduct =listProducts[i];
       for( let z=0;z<avantagesList.length;z++){

        let currentAvantage =avantagesList[z];
        if(currentAvantage['EAN']==currentProduct['EAN']){
          currentProduct['DateUtilisation']=currentAvantage['DateUtilisation'];
          currentProduct['DateReservation']=currentAvantage['DateReservation'];
          if(currentAvantage['EstUtilise']==true){
            that.avantagesProductsList_used.push(currentProduct);
          }
          else{
            that.avantagesProductsList.push(currentProduct);
          }
        }
      }
     }
   })
 }

}
