import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { EditarPerfilPage } from '../editar-perfil/editar-perfil';

/**
 * Generated class for the PerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil',
  templateUrl: 'perfil.html',
})
export class PerfilPage {

  uid: string;
  user: Observable<any>;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private menuCtrl: MenuController,
    private afProvider: AngularFireProvider,
    private afAuth: AngularFireAuth
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilPage');
    this.uid = this.afAuth.auth.currentUser.uid;
    console.log(this.uid);
    this.getPersonalUserData();
    //this.menuCtrl.enable(false);
  }

  getPersonalUserData(){
    this.user = this.afProvider.getUserData(this.uid).valueChanges()
  }

  editarPerfil(){
    this.navCtrl.push(EditarPerfilPage, {uid: this.uid});
  }

}
