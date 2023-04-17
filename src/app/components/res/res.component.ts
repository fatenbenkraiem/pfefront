import { Component, OnInit } from '@angular/core';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { RessourcesService } from 'src/app/services/ressources.service';
import { Subscription, interval  } from 'rxjs';

@Component({
  selector: 'app-res',
  templateUrl: './res.component.html',
  styleUrls: ['./res.component.css']
})
export class ResComponent implements OnInit {

  actualitesRes!: ActualiteRes[]
  hasAtualites = false;
  updateSubscription!: Subscription

  
  constructor(private ressourcesService: RessourcesService) { }
  getAll(){
    this.ressourcesService.getAll().subscribe(data=> {
      console.log(data);
      if(data != null)
      {
        this.hasAtualites = true;
        this.actualitesRes = data;
      }
 
    }, error=>console.log("here check"+error))
  }
  ngOnInit(): void {
    this.gotoTop();
  this. getAll();
    this.updateSubscription = interval(5000).subscribe((data) =>{
  
    this. getAll();
    })
  }
  
 
  mydate (act :ActualiteRes): String {

    return  Object.values(act)[1]
    }
    
  
    

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  gotoTDetails() {
    window.scroll({ 
      top: 1000, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}

