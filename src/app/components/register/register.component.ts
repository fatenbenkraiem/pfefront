import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AuthenticationService } from 'src/app/services/authentication-service.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  userauth :User =new User();
  errorMessage = 'Invalid Credentials';
  successMessage!: string;
  invalidregister = false;
  registerSuccess = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit(): void {
  }

 Register() {
  this.authenticationService.registeruser(this.userauth).subscribe((result)=> {
    console.log(Object.values(result))
    let id = Object.values(result)[1]
    let token = Object.values(result)[3]
    this.authenticationService.savesession(id,token)
    this.invalidregister = false;
    this.registerSuccess = true;
    this.successMessage = 'Register Successful.';
    this.router.navigate(['admin/edit']);
  }, (error) => {
    console.log(error)
    this.invalidregister = true;
    this.registerSuccess = false;
  });      
}
}
