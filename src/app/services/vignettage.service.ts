import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject} from 'rxjs'
declare var $ :any;

@Injectable({
  providedIn: 'root'
})
@Injectable()
export class VignettageService {
  constructor(private http:HttpClient) { }
  
  private globaldatas = new BehaviorSubject('initGobalData');
  public globalInfos:any= this.globaldatas.asObservable(); 
  public modalAddProductClose:any=false;
  public deviceMode :any;

  loadDatas(){
    return this.http.get('assets/data2.json');
  }

  loadDatas2() {
    console.log('loadDatas');
    const headers = new HttpHeaders().set('JETONCLIENT', 'bouchon');
    return this.http.get("https://sdp.mservices.dev.its.dnsi/VignettageAPI/api/Vignettage/RecupererOperation", { 'headers': headers });
  }

  modifGlobal(data:any){
    this.globaldatas.next(data);
  }

  deviceDetector(){

    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
      this.deviceMode="mobile";
    }else{
      this.deviceMode="desktop";
    }
    
  }
  showDescription(event:any){
    var btnTarget = $(event.target);
    if( btnTarget.hasClass('fa-minus')){//masquer
      btnTarget.removeClass('fa-minus');
      btnTarget.addClass('fa-plus');
      btnTarget.next('.productDescription1').hide(); 
    }
    else{//afficher
      btnTarget.removeClass('fa-plus');
      btnTarget.addClass('fa-minus');
      btnTarget.next('.productDescription1').show(); 
    }
  }
}
