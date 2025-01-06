import { Component, OnInit,HostListener } from '@angular/core';
import { faOtter } from '@fortawesome/free-solid-svg-icons';
declare var $ :any;

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.faqListFiltered = this.faqList;
  }
  // systeme de recherche des questions : faire une nouvelle liste des questions a partir de la liste originale
  // nouvelle liste filtrée avec le ou les mots cherchés dans la barre de recherche
  // chercher les mots présents dans le titre ou dans le corps des réponses 
  // si mot(s) présent(s) > ajoutés dans la nouvelle liste 

  faqList:any=[
    {"id":"0","question":"Comment cumuler des vignettes ?","answer":"Vous bénéficiez d’1 vignette tous les 10€ d’achats en magasin ou sur www.leclercdrive.fr. Vous pouvez gagner des vignettes supplémentaires pour tout achat d’un produit partenaire. "},
    {"id":"1","question":"Comment s’inscrire à l’opération en cours ?","answer":"Vous bénéficiez d’1 vignette tous les 10€ d’achats en magasin ou sur www.leclercdrive.fr. Vous pouvez gagner des vignettes supplémentaires pour tout achat d’un produit partenaire. "},
    {"id":"2","question":"Comment s’inscrire ?","answer":"Vous test test test  "}
  ]
  faqListFiltered:any=[];

  searchFaq($event:any){

    let currentWord:any = $($event.target).val();
    let regex:any = new RegExp(currentWord, "i");
    console.log('searchFaq > '+currentWord);
    if(currentWord.length==0){
      this.faqListFiltered = this.faqList;
    }
    else
      this.faqListFiltered  =  this.faqList.filter(function(hero:any) {
        return hero['question'].search(regex)!=-1;
      });
      
    }

  isInArray(currentId:any){
    let present = false;
    for(let z=0;z<this.faqListFiltered.length;z++){
      let currentB = this.faqListFiltered[z]['id']
      if(Number(currentId)==Number(currentB)){
        present=true;
      }
    }
    return present;
  }
  openFaq($event:any){
      
      let faqParentBlock = $($event.target).closest('.card');
      let openMode:any = faqParentBlock.find('.collapse').hasClass('show');
      $('body section div').removeClass('blueBg');
      if( openMode==true){
        faqParentBlock.removeClass('blueBg');
      }
      else{// block affiché 
        // ajout de class pour ajouter un fond bleu quand le block Faq est ouvert 
        faqParentBlock.addClass('blueBg');
      }
  }
  openFaqB($event:any){
      
    /*
      */

     $('.faqBox3 button').addClass('collapsed');
     $('.faqBox3 .collapse').removeClass('show');
     
      let faqParentBlock = $($event.target).closest('.card');
      let openMode:any = faqParentBlock.find('.collapse').hasClass('show');
      $('body section div').removeClass('blueBg');
      if( openMode==true){
        faqParentBlock.removeClass('blueBg');
      }
      else{// block affiché 
        // ajout de class pour ajouter un fond bleu quand le block Faq est ouvert 
        faqParentBlock.addClass('blueBg');
      }
  }
}
