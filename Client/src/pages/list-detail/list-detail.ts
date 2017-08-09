import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-list-detail',
  templateUrl: 'list-detail.html',
  styles: [`
  .my-class {
    background-color: yellow;
    text-align: right;
  }
  $stable: #f8f8f8 !default;

.scroll {
  padding: 10px 0 50px !important;
}
.messages {
  display: -webkit-box !important;
  display: -moz-box !important;
  display: -ms-flexbox !important;
  display: -webkit-flex !important;
  display: flex !important;
  -webkit-align-content: center !important;
  -ms-flex-line-pack: center !important;
  align-content: center !important;
  -webkit-box-align: center !important;
  -moz-box-align: center !important;
  -webkit-align-items: center !important;
  -ms-flex-align: center !important;
  align-items: center !important;
  margin-bottom: 20px !important;
  .message {
    -webkit-box-flex: 1 !important;
    -moz-box-flex: 1 !important;
    -webkit-flex: 1 1 auto !important;
    -ms-flex: 1 1 auto !important;
    flex: 1 1 auto !important;
    padding: 10px !important;
    -webkit-transition: all 250ms ease-in-out !important;
    transition: all 250ms ease-in-out !important;
    overflow: hidden !important;
    text-align: left !important;
    -webkit-transform: translate3d(0, 0, 0) !important;
    -moz-transform: translate3d(0, 0, 0) !important;
    transform: translate3d(0, 0, 0) !important;
  }
}
.time {
  -webkit-box-flex: 0 !important;
  -moz-box-flex: 0 !important;
  -webkit-flex: 0 1 auto !important;
  -ms-flex: 0 1 auto !important;
  flex: 0 1 auto !important;
  -webkit-align-self: auto !important;
  -ms-flex-item-align: auto !important;
  align-self: auto !important;
  text-align: center !important;
  padding: 0 0 0 0 !important;
  -webkit-transition: all 250ms ease-in-out !important;
  transition: all 250ms ease-in-out !important;
  -webkit-transform: translate3d(10px, 0, 0) !important;
  -moz-transform: translate3d(10px, 0, 0) !important;
  transform: translate3d(10px, 0, 0) !important;
  &.slide-right {
    -webkit-transform: translate3d(130px, 0, 0) !important;
    -moz-transform: translate3d(130px, 0, 0) !important;
    transform: translate3d(130px, 0, 0) !important;
  }
}
//This will change
.messages.other {
  .message {
    -webkit-transform: translate3d(0, 0, 0) !important;
    -moz-transform: translate3d(0, 0, 0) !important;
    transform: translate3d(0, 0, 0) !important;
    text-align: right !important;
  }
  .message.slide-right {
    -webkit-transform: translate3d(120px, 0, 0) !important;
    -moz-transform: translate3d(120px, 0, 0) !important;
    transform: translate3d(120px, 0, 0) !important;
    color: black !important;
    background-color: #C7C7CC !important;
  }
  span {
    color: black !important;
    background-color: #C7C7CC !important;
  }
}
.otherUser {
  -webkit-transform: translate3d(120px, 0, 0) !important;
  -moz-transform: translate3d(120px, 0, 0) !important;
    transform: translate3d(120px, 0, 0) !important;
  color: black !important;
  background-color: #C7C7CC !important;
  max-width:340px;
  padding: 10px !important;
  border-radius: 10px !important;
  text-align: right !important;
  align-content: right!important;
  margin-left:25px;
}
span {
  background: #007AFF !important;
  display: inline-block !important;
  color: white !important;
  padding: 10px !important;
  border-radius: 10px !important;
  text-align: left !important;
  max-width: 240px !important;
}

  `]
})
export class ListDetailPage {
  UserName: any;
  myMessages: any;
  allRemoteMessages = [];
  MainrListItemsById: any;
  id: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private http:Http) {
     this.id = this.navParams.get('id');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListDetailPage');
  }

sendMsg(){
      this.allRemoteMessages.push({text:this.myMessages,time:'2017',who:this.UserName,foodImage:null});
      this.myMessages = "";
    }
}
