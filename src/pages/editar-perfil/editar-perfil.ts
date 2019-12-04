import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { User } from '../../modal/user';

/**
 * Generated class for the EditarPerfilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editar-perfil',
  templateUrl: 'editar-perfil.html',
})
export class EditarPerfilPage {

  user = {} as User;
  usr: any;
  name: string;
  surname: string;
  phone: string;
  uid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    public loadCtrl: LoadingController
    ) {



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditarPerfilPage');
    this.uid = this.navParams.get('uid')
    this.afProvider.getUserData(this.uid).valueChanges().subscribe(u=>{
      this.usr = u;
      console.log(this.usr.name, this.usr.surname, this.usr.email, this.usr.phone);
      this.name = this.usr.name;
      this.surname = this.usr.surname;
      this.phone = this.usr.phone;
    })
  }

  editarDatos(){
    let load = this.loadCtrl.create({
      content: 'Usuario Editado',
      duration: 2000
    });
    load.present().then(()=>{
      this.afProvider.editUserData(this.uid, this.user)
    }).catch(e=>{
      alert(e)
    });
    load.onDidDismiss(()=>{
      this.navCtrl.pop();
    })
    
  }

}
