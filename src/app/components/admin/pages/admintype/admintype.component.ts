import { Component, OnInit } from '@angular/core';
import { NgToastService} from 'ng-angular-popup';
import { ActualitesType } from 'src/app/model/actualite-type';
import { TypeService } from 'src/app/services/type.service';

import { Router } from '@angular/router';
//import { isDefined } from '@angular/compiler/src/util';

@Component({
  selector: 'app-admintype',
  templateUrl: './admintype.component.html',
  styleUrls: ['./admintype.component.css']
})
export class AdmintypeComponent implements OnInit {
  
  currentPage = 1;
  itemsPerPage = 10;

  actualiteEF: ActualitesType= new ActualitesType();

  actualitesType!: ActualitesType[];

  totalActualites!: number;
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  constructor(
    private typeService: TypeService,
     private toastr: NgToastService,
    private router: Router
    
  ) { }

  ngOnInit(): void {
    this.getActualites();
   
    
  }

  redirectToList(){
    this.router.navigate(['/admin/type'])
  }

  createActualiteEF(){
    this.typeService.createActualite(this.actualiteEF).subscribe(data=>{
      console.log(data)
      this.toastr.success({detail:"Message succès!",summary:"Type publié avec succès!",duration:500})
      this.getActualites()
      this.redirectToList()
    }, error=>{
      this.toastr.error({detail:"Message error!",summary:"Type non publié !",duration:500})
    });
  }
  updateActualiteEF(){
    this.typeService.updateActualite(this.actualiteEF,this.actualiteEF.id).subscribe(data=>{
      console.log(data)
      this.toastr.success({detail:"Massage succès!",summary:"Type Modifier avec succès!",duration:500})
      this.getActualites()
      this.redirectToList()
    }, error=>{
      this.toastr.error({detail:"Message error!",summary:"Type non modifier!",duration:500})
    });
  }
  getActualites(){
    this.actualiteEF = new ActualitesType();
    this.typeService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesType = data;
        this.totalActualites = data.length;
        this.hideAddForm();
        this.hideEditForm();
      }else{
        this.totalActualites = 0;
        this.actualitesType = [];
      }
    }, error => {
      this.toastr.warning({detail:"Massage error!",summary:"Server non répondu!",duration:500})
    });
  }

  deleteActualite(id:number) {
    this.typeService.deleteActualite(id).subscribe(data => {
       this.toastr.warning({detail:"L'actualité supprimée!",duration:500})
      this.getActualites();
      this.redirectToList() 
    }, error => {
      this.toastr.error({detail:"Error",summary:" server not responding!",duration:500})
      console.log(error)
    })
  }

  editActualite(act: ActualitesType) {
    var id= Object.values(act)[0];
    this.typeService.findActualiteById(id).subscribe(data=>{
      this.actualiteEF = data;
      console.log(data)
      this.showEditForm();
    });
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
  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  
}
