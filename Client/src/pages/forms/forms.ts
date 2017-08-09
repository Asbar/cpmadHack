import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { Http, Headers } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-about',
  templateUrl: 'forms.html'
})
export class formsPage {
  time: any;
  date: any;
  courseType: any;
  discount: string;
  price: string;
  food: string;
  form: any = [];
  public base64Image: string;
  constructor(public navCtrl: NavController, private http: Http, private toastCtrl: ToastController,
   private camera: Camera, private imagePicker: ImagePicker) {

  }

  save() {

    if (this.food == "" || this.food == undefined) {

      this.showErrorMessage("Course Name field is empty");
      return;

    } else if (this.courseType == "" || this.courseType == undefined) {

      this.showErrorMessage("courseType is empty");
      return;

    } else if (this.price == "" || this.price == undefined) {

      this.showErrorMessage("Price field is empty");
      return;

    } else if (this.discount == "" || this.discount == undefined) {

      this.showErrorMessage("Discount field is empty");
      return;
    }

    var tempPrice = parseInt(this.price);
    var tempDiscount = parseInt(this.discount);

    tempPrice = (tempPrice * tempDiscount) / 100;

    this.form = [{
      header: "Courses",
      Name: this.food,
      productImg: "assets/img/course.png",
      courseType: this.courseType,
      oldPrice: this.price,
      newPrice: tempPrice,
      date:this.date,
      time:this.time
    }]

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/api/orderListItems', JSON.stringify(this.form), { headers: headers })
      .subscribe(res => {
        const toast = this.toastCtrl.create({
            message: 'Successfully Added a product',
            duration: 3000
          });
          toast.present();
          this.navCtrl.push(HomePage);
      });
  }

  showErrorMessage(errorMsg) {

var options = {};
this.imagePicker.getPictures(options).then((results) => {
  for (var i = 0; i < results.length; i++) {
      console.log('Image URI: ' + results[i]);
  }
}, (err) => { });
    let toast = this.toastCtrl.create({
      message: errorMsg,
      duration: 3000,
      showCloseButton: true,
      closeButtonText: "Ok",
      position: 'top'
    });
    toast.present();
  }

  takePicture() {
    this.camera.getPicture({
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
      this.base64Image = "data:image/jpeg;base64," + imageData;
      //alert(this.base64Image);
      console.log(this.base64Image);
    }, (err) => {
      console.log(err);
    });
  }

}
