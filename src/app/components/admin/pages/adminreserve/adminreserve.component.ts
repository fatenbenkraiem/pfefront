import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService} from 'ng-angular-popup';
import { Reservation } from 'src/app/model/reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { Demandeur } from 'src/app/model/Demandeur';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { RessourcesService } from 'src/app/services/ressources.service';
import { ContactService } from 'src/app/services/contact.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-adminreserve',
  templateUrl: './adminreserve.component.html',
  styleUrls: ['./adminreserve.component.css']
})
export class AdminreserveComponent implements OnInit {
 
  currentPage = 1;
  itemsPerPage = 10;

  id!:string;
  iduser!:string;
  idres!:string;
  Demandeurs: Demandeur[] = [];
  actualitesRes!: ActualiteRes[];
  host: string = "http://127.0.0.1:8000";
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  base64Data: any;
  
  retrieveResonse: any;
  reservations: Reservation[] = [];
  
  reservation: Reservation = new Reservation();
  totalReservations!: number;
  myForm: FormGroup;

  constructor(
    private toastr: NgToastService,
    private reservationService: ReservationService,
    private ressourcesService: RessourcesService,
    private contactservice :ContactService,
    private router: Router
    
    ) { this.myForm = new FormGroup({
      datedebut: new FormControl(null, [Validators.required]),
      datefin: new  FormControl(null, [Validators.required]),
      etat: new  FormControl(null, [Validators.required]),
      res: new  FormControl(null, [Validators.required]),
      user: new  FormControl(null, [Validators.required]),
    });}

  ngOnInit(): void {
    this.getReservations();
    this.getActualitesadmin();
    this.getDemandeurs();
  }

  getReservations() {
    this.reservation = new Reservation();
    this.reservationService.getReservations().subscribe(data => {
      if (data != null) {
        this.reservations = data;
        this.totalReservations = data.length;
      } else {
        this.totalReservations = 0;
        this.reservations = []
      }
    })
  }
  getActualitesadmin(){
    this.ressourcesService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesRes = data;
      }else{
        this.actualitesRes = [];
      }
    }, error => {
      this.toastr.warning({detail:"Serveur ne répond pas!"})
    });
  }
  getDemandeurs() {
    this.contactservice.getcontact().subscribe(data => {
      if (data != null) {
        this.Demandeurs = data;
        console.log(data.length)
      } else {
        this.Demandeurs = []
      }
    }, error => {
       this.toastr.warning({detail:"error",summary:"Serveur ne répond pas!"})
     });
  }

   createReservation(){
    this.reservation.datedebut=this.myForm.value.datedebut;
    this.reservation.datefin=this.myForm.value.datefin;
    this.reservation.etat=this.myForm.value.etat;
    const id=this.myForm.value.res;
    const iduser=this.myForm.value.user;
  this.reservationService.createReservation(this.reservation,this.id,this.iduser).subscribe(data=>{
      console.log(data)
      this.toastr.success({detail:"Message succès",summary:"Actualité publié avec succès!"})
      this.getReservations()
      this.redirectToList()
    }, error=>{
      console.log(error);
      this.toastr.error({detail:"Erreur",summary:"Serveur ne répond pas!"})
    });
    this.reservation=new Reservation();
  }
 
  editReservation(Reservation:Reservation) {
    //var id= Object.values(act)[0]
    console.log(Reservation.id)
    this.gotoTop();
    this.showEditForm();
    console.log(this. addFormVisible)
    this.reservationService.findReservationById(Reservation.id).subscribe(data=>{
      this.reservation = data;
      this.myForm.setValue({
        datedebut: this.reservation.datedebut,
        datefin: this.reservation.datefin,
        user: this.reservation.user_id,
        res:this.reservation.res_id
        
      });
    
    });
  }
  updateReservation(){
    this.reservation.datedebut=this.myForm.value.datedebut;
    this.reservation.datefin=this.myForm.value.datefin;
    this.reservation.etat=this.myForm.value.etat;
    const id=this.myForm.value.res;
    const iduser=this.myForm.value.user;
    this.reservationService.updateReservations(this.reservation.id,this.reservation,this.idres).subscribe(data=>{
     
      this.getReservations()
      this.redirectToList()
    }, error=>{
      this.toastr.error({detail:"Erreur",summary:"Serveur ne répond pas!"})
    });
  }
  deleteReservation(Reservation:Reservation) {   
    var id= Object.values(Reservation)[0]
       this.reservationService.deleteReservation(id).subscribe(data => {
         this.toastr.warning({detail:"Message Succès",summary:"L'actualité supprimée!"})
         console.log(data);
         this.getReservations();
         this.redirectToList()
         
       }, error => {
         this.toastr.error({detail:"Error",summary:"server not responding!"})
         console.log(error)
       })
     }
  onOptionSelected(event: any) {
    this.id = event.target.value;
    console.log(this.id);
  }
  onOptionSelect(event: any) {
    this.iduser = event.target.value;
    console.log(this.iduser);
  }
  
  showAddForm() {
    this.addFormVisible = true;
  }
  hideAddForm() {
    this.addFormVisible = false;
  }

  showEditForm() {
    this.editFormVisible = true;
  }
  hideEditForm() {
    this.editFormVisible = false;
  }

  redirectToList() {
    this.router.navigate(['/admin/reserve'])
  }

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  
} 
 
