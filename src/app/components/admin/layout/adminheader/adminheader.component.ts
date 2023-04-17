import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication-service.service';

@Component({
  selector: 'app-adminheader',
  templateUrl: './adminheader.component.html',
  styleUrls: ['./adminheader.component.css']
})
export class AdminheaderComponent implements OnInit {

  constructor(private authenticationService :AuthenticationService ,private router: Router ,) { }
logout()
{
  this.authenticationService.logout();
  this.router.navigate(['/res']);
}

  ngOnInit(): void {
  }

}

