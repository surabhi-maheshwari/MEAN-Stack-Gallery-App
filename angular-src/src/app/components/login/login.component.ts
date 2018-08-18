import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
username: String;
password:String;
  constructor(private authservice: AuthService,private router: Router,private flashmessageservice: FlashMessagesService) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user = {
    username: this.username,
    password:this.password
  }
  this.authservice.authenticateUser(user).subscribe(data=>{
    if(data.success)
    {
      this.authservice.storeUserData(data.token, data.user);
      this.flashmessageservice.show('Hello user, you are authenticated', {cssClass: 'alert-success', timeout: 3000});
      this.router.navigate(['/dashboard']);
    }else{
      this.flashmessageservice.show(data.msg, {cssClass: 'alert-danger', timeout: 3000});
      this.router.navigate(['/login']);
    }
  }); 
 }

}
