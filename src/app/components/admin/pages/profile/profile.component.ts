import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';


import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
import { ImageService } from 'src/app/services/image.service';
import { userservice } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor( private Userservice :userservice,
     private toastr: NgToastService,
     private router:Router ,  private  imageservice :ImageService
    ) { }
user :User =new User()
check:boolean =false ;
cpassword :String="" ;
npassword :String |any ="" ;

  ngOnInit(): void {
    this.getusers ()
  }
getusers ()
{
  let username :any =sessionStorage.getItem('authenticatedUser');
  this.Userservice.getuser(username).subscribe(
    data=>{
      console.log(data)
      this.user=data;
    
    }
  )
 // console.log(this.user.image)
}

show(){
  this.check=true;
 
}
hide(){
  this.check=false;

}

edit() 
{

  
  if (this.cpassword .length==0 &&this.npassword .length==0)
  {

    this.Userservice.edituser(this.user).subscribe(data=> 
      { 
                  console.log(data)
                  this.user=data ;
                  this.toastr.success({detail:"Edit avec succès"});
                  this.router.navigate(['/admin/edit']);
          
        }
          
        );
  }
  else{
 if (this.cpassword==this.user.password && this.npassword .length>5)
 {
this.user.password=this.npassword 

this.Userservice.edituser(this.user).subscribe(data=> 
  { 
              console.log(data)
              this.user=data ;
              this.toastr.success({detail:"Edit avec succès"});
              this.router.navigate(['/admin/login']); 
    }
    );

 }
 else
 {
  this.toastr.error({detail:"Failed password"});
 }
 
  }
 
}



  fileSelected: boolean = false;
  selectedFile!: File;
 
  imageUrl: any;
  retrievedImage: any;
  retrieveResonse: any;
  
  file: any;



UploadFile(): void {

  if (this.selectedFile !=null)
  {
  const formData = new FormData();
  formData.append('text',"formation")
  formData.append('files', this.selectedFile, this.selectedFile.name); 
  this.imageservice.saveImage(formData).subscribe(
    event => {
      console.log(event);
    
    },
    (error: HttpErrorResponse) => {
      console.log(error);
    }
  );
  }
}

public changeImage(event: any) {
  if (event.target.files.length > 0) {
    const file = event.target.files[0];
    this.selectedFile = file;
    var mimeType = file.type;
    if (mimeType.match(/image\/*/) == null) {
      //this.toastr.warning("merci de sélectionner une image valide");
      return;
    }
    var reader = new FileReader();
    this.file = file;
    reader.readAsDataURL(file);
    reader.onload = (_event) => {
      this.imageUrl = reader.result;
    }

  //this.user.image=this.user.image.substring(this.user.image.lastIndexOf("\\"))
    this.fileSelected = true;
  }

}
}

