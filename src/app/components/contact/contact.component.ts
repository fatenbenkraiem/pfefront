import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Demandeur } from 'src/app/model/Demandeur';
import { ContactService } from 'src/app/services/contact.service';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  demandeur :  Demandeur = new Demandeur ();
  
  constructor( private  _ContactService:ContactService,private router :Router ) { }
  adddemandeur()
  { 
    this.demandeur.email="empty"
   
   this._ContactService.create(this.demandeur).subscribe(data=>console.log(data))
   this.redirectTo()
  }
  
  redirectTo(){
    this.router.navigate(['/res'])
  }


 
  ngOnInit(): void {
  
    this.gotoTop()
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

}
