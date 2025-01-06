import { Component, OnInit } from '@angular/core';
import { VignettageService} from '../../services/vignettage.service'
declare var $ :any;

@Component({
  selector: 'all-app-products',
  templateUrl: './allProducts.component.html',
  styleUrls: ['./allProducts.component.scss'],
  providers:[VignettageService]
})
export class allProductsComponent implements OnInit {

  constructor(private vignetteService:VignettageService) { }

  public appInfos:any={'ProduitsARemporter':[]}
  public vignettesService=this.vignetteService;
  public onlineUser:any=false;
  public nbrProductPossible:any=0;
  public limitList1:number=4;
  public limitList2:number=4;
  public selectedFilterHistory:any=[];
  public selectedFilterNow:any=[];
  public datesOperation:any={'debut':'','fin':''};  
  public stateApp:any={'onlineUser':false,'userDigital':false,'userVignettes':20,'operation':'coming'};


  public actualProducts:any=[];
  public futureProducts:any=[];
  public filterProducts:any=[];

  ngOnInit(): void {
    this.getDatas();
    //Recuperation des infos d'etat de l'app
    if(localStorage.getItem('vignettage')){
      let recup :any =localStorage.getItem('vignettage');
      this.stateApp = JSON.parse(recup);
    }
  }
  getDatas(){
     this.vignetteService.loadDatas().subscribe(data=>{
      this.appInfos=data;
      this.appInfos=this.appInfos['DONNEES'];

    })
  }


}
