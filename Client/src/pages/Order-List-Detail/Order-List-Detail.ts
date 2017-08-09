import { Component } from '@angular/core';
import { IonicPage, NavController, Refresher, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-Order-List-Detail',
  templateUrl: 'Order-List-Detail.html',
})
export class OrderListDetailPage {

  feedBackList: any;
  feedBack: any;
  media: any;
  country: any;
  hours: any;
  cartPrimaryKey: any;
  isUpdate: boolean = false;
  cartItems: any;
  isDisable: boolean = true;
  orderDetail: any;
  foodImage: any;
  foodName: any;
  orderListItemsById: any;
  id: any;
  TempOldPrice: number = 450;
  TempNewPrice: number = 350;
  i: number = 0;
  quantity: any;
  newPrice: number = 450;
  oldPrice: number = 350;




  constructor(public navCtrl: NavController, public navParams: NavParams,
    public loadingCtrl: LoadingController, private http: Http, private toastCtrl: ToastController) {

    this.http.get('http://localhost:3000/api/cart').map(res => res.json()).subscribe(data => {
      this.cartItems = data;
    });

    this.http.get('http://localhost:3000/api/feedBack').map(res => res.json()).subscribe(data => {
      this.feedBackList = data;
    });

    this.id = this.navParams.get('id');
    if (this.id != null || this.id != undefined) {
      this.http.get('http://localhost:3000/api/orderListItems/' + this.id).map(res => res.json()).subscribe(data => {
        this.orderListItemsById = data;

        this.TempNewPrice = this.orderListItemsById[0].newPrice;
        this.oldPrice = this.orderListItemsById[0].oldPrice;
        this.foodName = this.orderListItemsById[0].Name;
        this.foodImage = this.orderListItemsById[0].productImg;
      });
    }
  }

  ionViewDidLoad() {
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 30
    });
    loader.present();
  }
  getPriceByQuan(quantity: any) {
    this.checkValidation();
    if (this.quantity != undefined) {

      this.TempNewPrice = 0;
      this.TempOldPrice = 0;

      this.quantity = parseInt(this.quantity);
      this.TempNewPrice = this.newPrice * this.quantity;
      this.TempOldPrice = this.oldPrice * this.quantity;
    }
  }

  doRefresh(refresher: Refresher) {


    setTimeout(() => {

      refresher.complete();

      const toast = this.toastCtrl.create({
        message: 'Session have been updated.',
        duration: 3000
      });
      toast.present();
    }, 1000);
  }


  // Add to cart

  addToCart() {

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    if (this.cartItems != undefined) {

      for (var item of this.cartItems) {
        if (item.cartId == this.id) {

          this.cartPrimaryKey = item._id;

          this.orderDetail = [{
            id: this.cartPrimaryKey,
            cartId: this.id,
            foodName: this.foodName,
            foodImage: this.foodImage,
            country: this.country,
            media: this.media,
            quantity: this.quantity,
            TempOldPrice: this.TempOldPrice,
            TempNewPrice: this.TempNewPrice
          }];

          this.http.post('http://localhost:3000/api/cartUpdate', JSON.stringify(this.orderDetail), { headers: headers })
            .subscribe(res => {

              this.navCtrl.push(HomePage, {
                cart: 'cart'
              });
            });

          const toast = this.toastCtrl.create({
            message: 'Successfully Updated the Cart',
            duration: 3000
          });
          toast.present();
          this.isUpdate = true;
          return;
        }
      }
    }

    if (this.isUpdate == false || this.isUpdate == undefined) {

      this.orderDetail = {
        cartId: this.id,
        foodName: this.foodName,
        foodImage: this.foodImage,
        country: this.country,
        media: this.media,
        quantity: this.quantity,
        TempOldPrice: this.TempOldPrice,
        TempNewPrice: this.TempNewPrice
      };

      this.http.post('http://localhost:3000/api/cart', JSON.stringify(this.orderDetail), { headers: headers })
        .subscribe(res => {

          const toast = this.toastCtrl.create({
            message: 'Successfully Added to Cart',
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(HomePage, {
            cart: 'cart'
          });
        });
    }
  }

  checkSize() {
    this.checkValidation();
  }

  checkColor() {
    this.checkValidation();
  }


  checkValidation() {
    if (this.country == undefined || this.media == undefined || this.quantity == undefined) {
      this.isDisable = true;
    } else {
      this.isDisable = false;
    }
  }

  AddFeedBack(){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

     this.feedBack = {
      feedBack:this.feedBack,
    }

    this.http.post('http://localhost:3000/api/feedBack', JSON.stringify(this.feedBack), { headers: headers })
        .subscribe(res => {

          const toast = this.toastCtrl.create({
            message: 'Successfully Added a feedBack',
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(HomePage, {
            cart: 'cart'
          });
        });
  }
}
