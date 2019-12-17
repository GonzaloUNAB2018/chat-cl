import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoginPage } from '../login/login';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { PaginaChatPage } from '../pagina-chat/pagina-chat';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  contacts = [];
  contactos = [];
  user : any;
  uid : any;

  constructor(
    public navCtrl: NavController,
    private afAuth: AngularFireAuth,
    private menuCtrl: MenuController,
    private afProvider: AngularFireProvider,
    private loadingCtrl: LoadingController
    ) {
      this.uid = this.afAuth.auth.currentUser.uid;
      this.afProvider.getUserData(this.uid).valueChanges().subscribe(user=>{
        this.user = user;
        console.log(this.user)
        this.getContactsListFromDB(this.user.id);
      })

  }

  ionViewDidLoad(){
    this.menuCtrl.enable(true);
    
  }

  logout(){
    this.afAuth.auth.signOut().then(()=>{
      this.navCtrl.setRoot(LoginPage)
    })
  }

  getContactsListFromDB(id){
    let load = this.loadingCtrl.create({
      content : 'Cagando Usuarios'
    });
    load.present()
    this.afProvider.getContactsList().valueChanges().subscribe(users=>{
      this.contacts = users;
      this.contactos = this.contacts.filter((user)=>user.Data.id != id);
      if(this.contactos){
        console.log(this.contactos);
        load.dismiss();
      }
    })
  }

  openChat(id_other){
    this.navCtrl.push(PaginaChatPage, {id_other:id_other, uid:this.uid, id: this.user.id});
  }

}
