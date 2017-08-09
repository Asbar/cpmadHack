import { Component } from '@angular/core';
import { NavController, Refresher, ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import { TabsPage } from '../tabs/tabs';
import { SignupPage } from '../signup/signup';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html',
  styleUrls: ['/login.scss']
})
export class LoginPage {
  userCat: string;
  isExistingUser: boolean = false;
  allAvailableUserDetails: any;
  invalidUsername: boolean = false;
  invalidPassword: boolean = false;
  password: string;
  username: string;
  login: { username?: string, password?: string } = {};
  submitted = false;


  constructor(public navCtrl: NavController, private http: Http, private toastCtrl: ToastController) {
    this.http.get('http://localhost:3000/api/user').map(res => res.json()).subscribe(data => {
      this.allAvailableUserDetails = data;
      console.log(this.allAvailableUserDetails);
    });
  }

  onLogin() {

    this.isExistingUser = false;

    if (this.userCat == "" || this.userCat == undefined) {
      this.invalidUsername = true;
      return;
    } else {
      this.invalidUsername = false;
    }

    if (this.username == "" || this.username == undefined) {
      this.invalidUsername = true;
      return;
    } else {
      this.invalidUsername = false;
    }

    if (this.password == "" || this.password == undefined) {
      this.invalidPassword = true;
      return;
    } else {
      this.invalidPassword = false;
    }

    for (let item of this.allAvailableUserDetails) {
      if (item.Username == this.username && item.Password == this.password) {
        this.isExistingUser = true;
      }
    }

    if (this.isExistingUser == true) {

      this.invalidUsername = false;
      this.invalidPassword = false;

      window.localStorage.setItem('userCat', this.userCat);
      window.localStorage.setItem('username', this.username);        

      this.navCtrl.push(TabsPage).then(() => {
      });

    } else {
      this.isExistingUser = true;
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  doRefresh(refresher: Refresher) {

    this.http.get('http://localhost:3000/api/user').map(res => res.json()).subscribe(data => {
      this.allAvailableUserDetails = data;
    });

    setTimeout(() => {

      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Sessions have been updated.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }
}
