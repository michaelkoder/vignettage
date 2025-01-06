import { Component, OnInit, ElementRef } from '@angular/core';
import { VignettageService } from '../../services/vignettage.service'
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [VignettageService]
})
export class HomeComponent implements OnInit {

  constructor(private vignetteService: VignettageService, private eleRef: ElementRef) { }
  public appInfos: any = { 'DetailOperation': [] }
  public vignettesService = this.vignetteService;
  public disabledItem: any = true;
  public addMultipleProducts: any = false;
  public switchOption: any = true;
  public datesOperation: any = { 'debut': '', 'fin': '' };
  public selectedProduct: any = { 'vignettes': '' };
  public loopCompteur: any;
  public stateApp: any = { 'onlineUser': true, 'userDigital': true, 'userVignettes': 20, 'operation': 'open' };
  public nbrProductPossible: any = 0;
  public nbrCoupons: any = 0;
  public nbrProductSelected: any = 1;
  public decompteDate:any='000000';
  
   ngOnInit(): void {
    this.getDatas();
    this.compte_a_rebours();
    $('#sliderBoxItems').on('scroll', function () {
      console.log('Event Fired > ' + $('#sliderBoxItems').scrollLeft());
    });
    //Recuperation des infos d'etat de l'app
    if (localStorage.getItem('vignettage')) {
      let recup: any = localStorage.getItem('vignettage');
      this.stateApp = JSON.parse(recup);
    }
    else {
      localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
    }

  }

  getDatas() {
    let that = this;
    this.vignetteService.loadDatas().subscribe(data => {
      this.appInfos = data;

      if(this.appInfos['CR'] != 0){
        $("#errorModal").modal('show');
      }
       
      this.appInfos = this.appInfos['DONNEES'];
      console.table(this.appInfos )
      this.datesOperation['debut'] = this.appInfos['DetailOperation']['DateDebut'];
      this.datesOperation['fin'] = this.appInfos['DetailOperation']['DateFin'];
      $.each(this.appInfos['Coupons'],function(index:any,value:any){
        if(value.EstUtilise==false){
          that.nbrCoupons++;
        }
      })
      

    },error => {
      $("#errorModal").modal('show');
      console.log(error);
    })
  }

  compte_a_rebours() {
    var that = this;
    var date_actuelle: any = new Date();
    var date_evenement: any;

    // if(this.appInfos['DetailOperation']['Mode']==2){
    if(this.stateApp['operation']=='closed'){
      date_evenement= new Date(this.appInfos['DetailOperation']['DateFin']);
    }else{
      date_evenement= new Date(this.appInfos['DetailOperation']['DateDebut']);
    }
    
    var total_secondes = (date_evenement - date_actuelle) / 1000;

    if (total_secondes < 0) {
      total_secondes = Math.abs(total_secondes); // On ne garde que la valeur absolue
    }

    if (total_secondes > 0) {
      var jours: any = Math.floor(total_secondes / (60 * 60 * 24));
      var heures: any = Math.floor((total_secondes - (jours * 60 * 60 * 24)) / (60 * 60));
      var minutes: any = Math.floor((total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60))) / 60);
      var secondes: any = Math.floor(total_secondes - ((jours * 60 * 60 * 24 + heures * 60 * 60 + minutes * 60)));

      var et = "et";
      var mot_jour = "jours,";
      var mot_heure = "heures,";
      var mot_minute = "minutes,";
      var mot_seconde = "secondes";

      if (jours == 0) {
        jours = '';
        mot_jour = '';
      }
      else if (jours == 1) {
        mot_jour = "jour,";
      }

      if (heures == 0) {
        heures = '';
        mot_heure = '';
      }
      else if (heures == 1) {
        mot_heure = "heure,";
      }
      if (minutes == 0) {
        minutes = '';
        mot_minute = '';
      }
      else if (minutes == 1) {
        mot_minute = "minute,";
      }
      if (secondes == 0) {
        secondes = '';
        mot_seconde = '';
        et = '';
      }
      else if (secondes == 1) {
        mot_seconde = "seconde";
      }
      if (minutes == 0 && heures == 0 && jours == 0) {
        et = "";
      }

      if(jours==''){jours=0}
      if(heures==''){heures=0}
      if(minutes==''){minutes=0}

      if(jours<10){jours='0'+jours}
      if(heures<10){heures='0'+heures}
      if(minutes<10){minutes='0'+minutes}
      this.decompteDate = jours+''+heures+''+minutes;
    }
    else {
      this.decompteDate = '000000';
    }
    this.loopCompteur = setTimeout(function(){that.compte_a_rebours()}, 1000);
  }
  nbrProductDetector(nbrVignettes: any) {
    let calculNbr = Number(this.stateApp['userVignettes']) / Number(nbrVignettes);
    this.nbrProductPossible = Math.round(Number(calculNbr))
    return this.nbrProductPossible;
  }

  selectNbrProducts(mode: any) {
    if (mode == 'moins') {
      if (this.nbrProductSelected > 1) {
        this.nbrProductSelected = Number(this.nbrProductSelected) - 1;
      }
    }
    if (mode == 'plus') {
      if (this.nbrProductSelected < this.nbrProductPossible) {
        this.nbrProductSelected = Number(this.nbrProductSelected) + 1;
      }
    }
  }

  selectProduct(nbrVignettes: any, product: any) {
    this.nbrProductSelected = 1;
    this.selectedProduct = product;
    this.selectedProduct['vignettes'] = nbrVignettes;
  }

  productValidation() {
    let nbrVignettesToRemove = Number(this.selectedProduct['vignettes']) * Number(this.nbrProductSelected);
    let calcul = Number(this.stateApp['userVignettes']) - Number(nbrVignettesToRemove);
    if (calcul < 0) { calcul = 0; }
    this.stateApp['userVignettes'] = calcul;
    localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
  }
  userDititalMode() {
    if (this.stateApp['userDigital'] == false) { this.stateApp['userDigital'] = true }
    else { this.stateApp['userDigital'] = false }
    localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
  }
  onlineUserChange() {
    if (this.stateApp['onlineUser'] == false) { this.stateApp['onlineUser'] = true }
    else { this.stateApp['onlineUser'] = false }
    localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
  }
  changeOperationState(status: string) {
    this.stateApp['operation'] = status;
    localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
  }
  scrollDot(event: any, value: number) {
    let scrollElementSize: any = $('#sliderBoxItems .list-group-item:first-child').width();
    scrollElementSize = Math.round(scrollElementSize) + 40;
    let scrollValue = Number(value * scrollElementSize);
    $('.scrollDots li').removeClass('active');
    $(event.target).addClass('active');
    $('#sliderBoxItems').animate({ scrollLeft: scrollValue }, 800);
  }
  userAddVignette(number: number) {
    this.stateApp['userVignettes'] = Number(this.stateApp['userVignettes']) + number;
    localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
  }
  digitaliser() {
    console.log('digitaliser')
    this.stateApp['userDigital'] = true;
    this.stateApp['userVignettes'] += 2;
    localStorage.setItem('vignettage', JSON.stringify(this.stateApp));
  }
  calculPourc(value1: any, value2: any) {
    let pourc = (Number(value1) / Number(value2)) * 90;
    return pourc;
  }

  optionSwitch() {
    this.switchOption = !this.switchOption;
  }
}
