import { Component } from '@angular/core';

import { formsPage } from '../forms/forms';
import { HomePage } from '../home/home';
import { MapPage } from '../map/map';
import { ContactPage } from '../contact/contact';



@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  userCat: string;

  tab1Root = HomePage;
  tab2Root = formsPage;
  tab3Root = MapPage;

  constructor() {

    this.userCat = window.localStorage.getItem('userCat');
    if(this.userCat == "Teacher"){
      this.tab2Root = formsPage;
      this.tab3Root = MapPage;
    }else{
      this.tab2Root = null;
      this.tab3Root = null;
    }


  }
}
