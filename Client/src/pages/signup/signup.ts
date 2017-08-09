import { Component } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { NavController,ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'signup.html'
})
export class SignupPage {
  isExistingUser: boolean = false;
  allAvailableUserDetails: any;
  isCreateAccount: boolean = false;
  currentUserDetail: {
    userCat:string;
    Username: string;
    Password: string;
  }[];
  username: string;
  password: string;
  userCat:string;
  submitted = false;

  Ivalidusername = false;
  Ivalidpassword = false;


  constructor(public navCtrl: NavController, private http: Http,private toastCtrl:ToastController) {
    this.http.get('http://localhost:3000/api/user').map(res => res.json()).subscribe(data => {
      this.allAvailableUserDetails = data;
    });
  }

  onSignup() {
    this.isExistingUser = false;
    this.submitted = true;
    if (this.username == "" || this.username == undefined) {
      this.Ivalidusername = true;
      return;
    }

    if (this.password == "" || this.password == undefined) {
      this.Ivalidpassword = true;
      return;
    }
    if(this.userCat=="" || this.userCat==undefined){
      this.Ivalidpassword = true;
    }

    this.currentUserDetail = [{ Username: this.username, Password: this.password,userCat:this.userCat }]

    

    for (let item of this.allAvailableUserDetails) {
      if (item.Username == this.username) {
        this.isExistingUser = true;
      }
    }
    if (this.isExistingUser == true) {
      return;
    }

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/user', JSON.stringify(this.currentUserDetail), { headers: headers })
      .subscribe(res => {
        this.isCreateAccount = true;
        this.Ivalidusername = false;
        this.Ivalidpassword = false;

        const toast = this.toastCtrl.create({
          message: 'Successfully Created a New Account',
          duration: 3000
        });
        toast.present();
      });
  }

  goLogin() {
    this.navCtrl.push(LoginPage);
  }
}
