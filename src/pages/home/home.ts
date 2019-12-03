import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts = [];

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private afProvider: AngularFireProvider
    ) {

  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true);
    this.getContactsListFromDB();
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage)
    })
  }

  getContactsListFromDB(){
    this.afProvider.getContactsList().valueChanges().subscribe(users=>{
      console.log(users)
      this.contacts = users;
      if(this.contacts){
        console.log(this.contacts);
      }
    })
  }

}
