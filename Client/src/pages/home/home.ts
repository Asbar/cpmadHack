import { Component } from '@angular/core';
import { NavController, ItemSliding, AlertController, Refresher, ToastController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { ListDetailPage } from '../list-detail/list-detail';
import { OrderListDetailPage } from '../Order-List-Detail/Order-List-Detail';
import { CartPage } from '../cart/cart';
import { LoginPage } from '../login/login';

import 'rxjs/add/operator/map'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  styleUrls: ['/home.scss']
})
export class HomePage {
  TemporderList: any;
  cart: any;
  MainOrderListData: any;

  orderList: boolean = false;

  dayIndex = 0;
  queryText: String = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  confDate: string;
  user: any;
  posts;
  MainListData: any;


  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    private http: Http, private toastCtrl: ToastController, private navParams: NavParams) {

    this.cart = this.navParams.get('cart');

    if (this.cart == 'cart') {
      this.orderList = true;
    }

    this.http.get('http://localhost:3000/api/personListItems').map(res => res.json()).subscribe(data => {
      this.MainListData = data;

      this.http.get('http://localhost:3000/api/orderListItems').map(res => res.json()).subscribe(data => {
        this.MainOrderListData = data;
        this.TemporderList = data;
      });
    });
  }

  ionViewDidLoad() {
    this.setFilteredItems();
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {


    // create an alert instance
    let alert = this.alertCtrl.create({
      title: 'Favorite Added',
      buttons: [{
        text: 'OK',
        handler: () => {
          // close the sliding item
          slidingItem.close();
        }
      }]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  goToMainListDetail(MainListId) {

    this.navCtrl.push(ListDetailPage, {
      id: MainListId,
    });

  }
  updateSchedule() {
    // Close any open sliding items when the schedule updates

  }

  doRefresh(refresher: Refresher) {

    this.http.get('http://localhost:3000/api/personListItems').map(res => res.json()).subscribe(data => {
      this.MainListData = data;
    });

    this.http.get('http://localhost:3000/api/orderListItems').map(res => res.json()).subscribe(data => {
      this.MainOrderListData = data;
    });

    setTimeout(() => {

      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Main List have been updated.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }

  deleteReview(id) {

    this.http.delete('http://localhost:3000/api/lang/' + id).subscribe((res) => {
      console.log(res.json());
    });
  }

  showMainList() {
    this.orderList = false;
  }

  showOrderList() {
    this.orderList = true;



  }

  goToOrderListDetail(productId) {

    if (productId != undefined) {
      this.navCtrl.push(OrderListDetailPage, {
        id: productId
      });
    }
  }

  viewCart() {
    this.navCtrl.push(CartPage);
  }

  setFilteredItems() {

    if (this.TemporderList == null || this.TemporderList == undefined) {
      return null;
    }

    // this.MainOrderListData = this.TemporderList.map(_jobs => _jobs.filter((item) => {

    //   if (item.Name != null && item.Name.length > 0 && this.queryText != null && this.queryText.length > 0)
    //     return item.Name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;
    // }));

    this.MainOrderListData=this.TemporderList.filter((item) => {
            return item.Name.toLowerCase().indexOf(this.queryText.toLowerCase()) > -1;
        });  
  }
  logout(){
    this.navCtrl.push(LoginPage);
  }
}
