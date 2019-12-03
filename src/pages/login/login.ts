import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, MenuController } from 'ionic-angular';
import { RegistrePage } from '../registre/registre';
import { User } from '../../modal/user';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  password : string;
  uid: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    public loadCtrl: LoadingController,
    private menuCtrl: MenuController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menuCtrl.enable(false);
  }

  login(){
    let load = this.loadCtrl.create({
      content: 'Iniciando Sesión'
    });
    load.present();
    this.afAuth.auth.signInWithEmailAndPassword(this.user.email, this.password).then(user=>{
      if(user){
        this.uid = this.afAuth.auth.currentUser.uid
        console.log('Usuario listo '+this.uid);
        this.navCtrl.setRoot(HomePage).then(()=>{
          load.dismiss();
        })
      }
    }).catch(e=>{
      alert(e);
      console.log(e);
      load.dismiss();
    });
  }

  goToRegistrePage(){
    this.navCtrl.push(RegistrePage);
  }

}
