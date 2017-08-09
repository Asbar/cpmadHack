import { Component } from '@angular/core';
import { NavController, NavParams, ToastController,Refresher } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
  styleUrls: ['/map.scss']
})
export class MapPage {

  cartItems: any;
  totalPrice = 0.0;
  constructor(public navCtrl: NavController, public navParams: NavParams, private http: Http, private toastCtrl: ToastController) {
    this.http.get('http://localhost:3000/api/cart').map(res => res.json()).subscribe(data => {
      this.cartItems = data;

        for(var i=0;i<this.cartItems.length;i++){
        this.totalPrice += parseFloat(this.cartItems[i].TempNewPrice);
        console.log(this.totalPrice);        
    }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
  }

  removeCartItem(cartId) {
    console.log(cartId);
    this.http.delete('http://localhost:3000/api/cartDelete/' + cartId).subscribe(res => {

      this.navCtrl.setRoot(this.navCtrl.getActive().component);
      const toast = this.toastCtrl.create({
        message: 'Your Reject the Request',
        duration: 3000
      });
      toast.present();

    });
  }

  doRefresh(refresher: Refresher) {
    

    setTimeout(() => {

      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Order requests are updated.',
        duration: 3000
      });
      toast.present();
    }, 1000);

  }
  order(){
     setTimeout(() => {
      const toast = this.toastCtrl.create({
        message: 'Successfully Ordered',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }

}
