import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService} from 'ng-angular-popup';
import { ActualiteRes } from 'src/app/model/actualite-res';
import { RessourcesService } from 'src/app/services/ressources.service';
import { ImageService } from 'src/app/services/image.service';
import { ActualitesType } from 'src/app/model/actualite-type';
import { TypeService } from 'src/app/services/type.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-adminres',
  templateUrl: './adminres.component.html',
  styleUrls: ['./adminres.component.css']
})
export class AdminresComponent implements OnInit {
  currentPage = 1;
  itemsPerPage = 10;

  actualiteRes: ActualiteRes= new ActualiteRes();

  actualitesRes!: ActualiteRes[];
  idres!: string;
  totalActualites!: number;
  actualitesType!: ActualitesType[];
  addFormVisible: boolean = false;
  editFormVisible: boolean = false;
  myForm: FormGroup;
  constructor(
    private fileUploadService: ImageService,
    private typeService: TypeService,
    private ressourcesService: RessourcesService,
    private toastr: NgToastService,
    private router: Router
  ) { this.myForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    description: new  FormControl(null, [Validators.required]),
    type: new  FormControl(null, [Validators.required]),
    image: new  FormControl(null),
  });}

  ngOnInit(): void {
    this.getActualitesadmin();
    this.getActualites();
  }

  redirectToList(){
    this.router.navigate(['/admin/res'])
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

  createActualite(){
    this.actualiteRes.name=this.myForm.value.name;
    this.actualiteRes.description=this.myForm.value.description;
    const id=this.myForm.value.type;
    this.actualiteRes.image=this.myForm.value.image;

  this.ressourcesService.createActualite(this.actualiteRes,id).subscribe(data=>{
      console.log(data)
      this.toastr.success({detail:"",summary:"Actualité publié avec succès!"})
      this.getActualitesadmin()
      this.redirectToList()
    }, error=>{
      console.log(error);
      this.toastr.error({detail:"Erreur",summary:"Serveur ne répond pas!"})
    });
    this.actualiteRes=new ActualiteRes();
  }

  getActualitesadmin(){
    this.actualiteRes = new ActualiteRes();
    this.ressourcesService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesRes = data;
        this.totalActualites = data.length;
        this.hideAddForm();
        this.hideEditForm();
      }else{
        this.totalActualites = 0;
        this.actualitesRes = [];
      }
    }, error => {
      this.toastr.warning({detail:"Serveur ne répond pas!"})
    });
  }
  getActualites(){
    this.typeService.getAll().subscribe(data => {
      if(data != null){
        console.log(data.length)
        this.actualitesType = data;
      }else{
        this.actualitesType = [];
      }
    }, error => {
       this.toastr.warning({detail:"Serveur ne répond pas!"})
    });
  }
  
  deleteActualite(act: ActualiteRes) {   
 var id= Object.values(act)[0]
    this.ressourcesService.deleteActualite(id).subscribe(data => {
        this.toastr.warning({detail:"L'actualité supprimée!"})
      console.log(data);
      this.getActualitesadmin();
      this.redirectToList()
      
    }, error => {
      this.toastr.error({detail:"Error",summary:"server not responding!"})
      console.log(error)
    })
  }

  editActualite(act: ActualiteRes) {
    //var id= Object.values(act)[0]
    console.log(act.id)
    this.gotoTop();
    this.showEditForm();
    console.log(this. addFormVisible)
    this.ressourcesService.findActualiteById(act.id).subscribe(data=>{
      this.actualiteRes = data;
      this.myForm.setValue({
        name: this.actualiteRes.name,
        description: this.actualiteRes.description,
        type: this.actualiteRes.type_id,
        image:this.actualiteRes.image
        
      });
    
    });
  }
 
  updateActualiteRes(){
    this.actualiteRes.name=this.myForm.value.name;
    this.actualiteRes.description=this.myForm.value.description;
    const id=this.myForm.value.type;
    this.actualiteRes.image=this.myForm.value.image;
    this.ressourcesService.updateActualite(this.actualiteRes,this.actualiteRes.id).subscribe(data=>{
      this.getActualitesadmin()
      this.redirectToList()
    }, error=>{
      this.toastr.error({detail:"Erreur",summary:"Serveur ne répond pas!"})
    });
  }

  onOptionSelected(event: any) {
    this.idres = event.target.value;
    console.log(this.idres);
  }
  
imagePath !:String;
selectedfile :any ;
imgURL: any;
  UploadFile(): void {
   
    if (this.selectedfile !=null)
    {
    const formData = new FormData();
    formData.append('text',"actuailitesres")
    formData.append('files', this.selectedfile, this.selectedfile.name); 
    this.fileUploadService.saveImage(formData).subscribe(
      event => {
        console.log(event);
      
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
    }
  }
 dispaly(event: any) :void
{
  this.selectedfile = event.target.files[0];
  var reader = new FileReader();
  this.imagePath = this.selectedfile;
  reader.readAsDataURL(this.selectedfile); 
  reader.onload = (_event) => { 
    this.imgURL = reader.result; 
  }
  this.actualiteRes.image=this.actualiteRes.image.substring(this.actualiteRes.image.lastIndexOf("\\"))

}

}
