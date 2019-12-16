import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

/**
 * Generated class for the PaginaChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pagina-chat',
  templateUrl: 'pagina-chat.html',
})
export class PaginaChatPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afProvider: AngularFireProvider
    ) {
      this.afProvider
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaChatPage');
  }



}
