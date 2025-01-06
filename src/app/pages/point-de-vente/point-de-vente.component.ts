import { Component, OnInit } from '@angular/core';
import { VignettageService} from '../../services/vignettage.service'
declare var $ :any;

@Component({
  selector: 'app-point-de-vente',
  templateUrl: './point-de-vente.component.html',
  styleUrls: ['./point-de-vente.component.scss']
})
export class PointDeVenteComponent implements OnInit {


  constructor(private vignetteService:VignettageService) { }
  public filterPointsVente:any;
  public pointsDevente:any;
  public appInfos:any={}

  ngOnInit(): void {

    this.getDatas();
    /*
      this.pointsDevente=[
      {"name":"Roques-sur-Garonne / Toulouse","address":"3 allée de Fraixinet","adress2":"31120 Roques-sur-Garonne","phone":"05.61.72.72.09"},
      {"name":"Roques-sur-Garonne / Toulouse","address":"3 allée de Fraixinet","adress2":"31120 Roques-sur-Garonne","phone":"05.61.72.72.09"},
      {"name":"Roques-sur-Garonne / Toulouse","address":"3 allée de Fraixinet","adress2":"31120 Roques-sur-Garonne","phone":"05.61.72.72.09"},
      {"name":"Roques-sur-Garonne / Toulouse","address":"3 allée de Fraixinet","adress2":"31120 Roques-sur-Garonne","phone":"05.61.72.72.09"},
      {"name":"Roques-sur-Garonne / Toulouse","address":"3 allée de Fraixinet","adress2":"31120 Roques-sur-Garonne","phone":"05.61.72.72.09"},
      {"name":"Roques-sur-Garonne / Toulouse","address":"3 allée de Fraixinet","adress2":"31120 Roques-sur-Garonne","phone":"05.61.72.72.09"}
    ]
    */
  }


  getDatas(){
    this.vignetteService.loadDatas().subscribe(data=>{
     this.appInfos=data;
     this.appInfos=this.appInfos['DONNEES'];
     this.pointsDevente=this.appInfos['Magasins'];
   })   
 }
 filtrer(){
   let filtred:any =[];
   if($('#pointsList input:checked').length>0 || $('#deptsList input:checked').length>0){
      let magasin = $('#pointsList input:checked').attr('id');
      let departement = $('#deptsList input:checked').attr('id');
      this.pointsDevente=this.appInfos['Magasins'];
      $.each(this.pointsDevente,function(index:number,value:any){
        if(value['TypeMagasin']==magasin){filtred.push(value)}
        if(value['Departement']==departement){filtred.push(value)}
      })
      this.pointsDevente=filtred;

    }
 }
 removeFilters(){
  $('#deptsList input:checked').prop('checked',false);
  $('#pointsList input:checked').prop('checked',false);
  this.pointsDevente=this.appInfos['Magasins'];
 }

}
