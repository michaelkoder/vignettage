import { Component, OnInit } from '@angular/core';
import { VignettageService} from './../../services/vignettage.service'
declare var $ :any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers:[VignettageService]
})
export class ProductsComponent implements OnInit {

  constructor(private vignetteService:VignettageService) { }

  public appInfos:any={'ProduitsARemporter':[]}
  public vignettesService=this.vignetteService;
  public onlineUser:any=false;
  public limitList1:number=4;
  public limitList2:number=4;
  public selectedFilterHistory:any=[];
  public selectedFilterNow:any=[];
  public datesOperation:any={'debut':'','fin':''};  
  public stateApp:any={'onlineUser':false,'userDigital':false,'userVignettes':20,'operation':'coming'};


  public actualProducts:any;
  public futureProducts:any;
  public filterProducts:any;

  ngOnInit(): void {
    this.getDatas();
    this.vignetteService.deviceDetector();
    if(this.vignetteService.deviceMode=='desktop'){
     this.limitList1=this.limitList2=6;
    }
    //Recuperation des infos d'etat de l'app
    if(localStorage.getItem('vignettage')){
      let recup :any =localStorage.getItem('vignettage');
      this.stateApp = JSON.parse(recup);
    }
  }
  onlineUserChange(){
    if(this.onlineUser==false){this.onlineUser=true}
    else{this.onlineUser=false}
  }
  seeMore(param:string){
    if(param=='futures'){
      console.log('seeMore disabled')
      this.limitList2=Number(this.limitList2+4);
      this.futureProducts= this.appInfos['DeclencheursFuturs']['Produits'].slice(0,this.limitList2);
    }else{
      this.limitList1=Number(this.limitList1+4);
      this.actualProducts= this.appInfos['DeclencheursActuels']['Produits'].slice(0,this.limitList1);
    }
  }
  getDatas(){
     this.vignetteService.loadDatas().subscribe(data=>{
      this.appInfos=data;
      this.appInfos=this.appInfos['DONNEES'];

      if(this.stateApp['operation']=='coming'){
        this.datesOperation['debut']=this.appInfos['DateDebutTeasing'];
        this.datesOperation['fin']=this.appInfos['DateFinTeasing'];
      }else{
        if(this.stateApp['operation']=='open'){
          this.datesOperation['debut']=this.appInfos['DateFinCollecteVignettes'];
          this.datesOperation['fin']=this.appInfos['DateFinOperation'];
        }
      }
      
      this.actualProducts= this.appInfos['DeclencheursActuels']['Produits'].slice(0,this.limitList1);
      this.futureProducts= this.appInfos['DeclencheursFuturs']['Produits'].slice(0,this.limitList2);
      this.filterProducts= this.appInfos['Rayons'];
    })
  }
  removeFilter(target:any){
    
    $('#filtresModal input').prop('checked','');
    $('#filtresModalHistory input').prop('checked','');
    if(target =='now'){
      this.selectedFilterNow=[];
      this.actualProducts = this.appInfos['DeclencheursActuels']['Produits'].slice(0,this.limitList1);
    }
    else{
      this.selectedFilterHistory=[];
      this.futureProducts = this.appInfos['DeclencheursFuturs']['Produits'].slice(0,this.limitList1);
    }
  }

  addFilter(rayonId:number,mode:string){
    // on regarde si l'id rayon existe dans la liste 
    if(mode=="now"){
      let rayonPosition =$.inArray(rayonId,this.selectedFilterNow);
      if(rayonPosition==-1){// si NON > on ajoute 
        this.selectedFilterNow.push(rayonId);
      }
      else{// Si oui > on supprime 
        this.selectedFilterNow.splice(rayonPosition,1);
      }
    }
    else{
      let rayonPosition =$.inArray(rayonId,this.selectedFilterHistory);
      if(rayonPosition==-1){// si NON > on ajoute 
        this.selectedFilterHistory.push(rayonId);
      }
      else{// Si oui > on supprime 
        this.selectedFilterHistory.splice(rayonPosition,1);
      }
    }
  }

  filterProductsList(filterMode:string){
    let that =this;
    if(filterMode =='now'){
      
      that.actualProducts=that.appInfos['DeclencheursActuels']['Produits'].slice(0,this.limitList1);
      let filteredList:any =[];
        $.each( that.actualProducts,function(index:any,value:any){
           let currentRayon = that.actualProducts[index];
           // si l'id du rayon courant est dans la liste des filtres selectionés on l'ajoute 
           if($.inArray(currentRayon['Rayon'],that.selectedFilterNow)!=-1){
            filteredList.push(currentRayon);
           }
        })
        that.actualProducts=filteredList;
    }
    else{
     
      this.futureProducts=this.appInfos['DeclencheursFuturs']['Produits'].slice(0,this.limitList1);
      let filteredList:any =[];
        $.each( this.futureProducts,function(index:any,value:any){
           let currentRayon = that.futureProducts[index];
           // si l'id du rayon courant est dans la liste des filtres selectionés on l'ajoute 

           if($.inArray(currentRayon['Rayon'],that.selectedFilterHistory)!=-1){
            filteredList.push(currentRayon);
           }
        })
        this.futureProducts=filteredList;
      
    }
  }
}
