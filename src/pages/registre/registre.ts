import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, MenuController } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { User } from '../../modal/user';
import { AngularFireAuth } from '@angular/fire/auth';


@IonicPage()
@Component({
  selector: 'page-registre',
  templateUrl: 'registre.html',
})
export class RegistrePage {

  user = {} as User;
  password: string;
  c_password: string;
  uid: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private afProvider: AngularFireProvider,
    private afAuth: AngularFireAuth,
    public loadCtrl: LoadingController,
    private menuCtrl: MenuController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrePage');
    this.menuCtrl.enable(false);
  }

  signUp(){
    if(this.password === this.c_password){
      let load = this.loadCtrl.create({
        content: 'Creando Nuevo Usuario...'
      });
      load.present();
      this.afAuth.auth.createUserWithEmailAndPassword(this.user.email, this.password).then(user=>{
        if(user){
          this.uid = this.afAuth.auth.currentUser.uid;
          console.log(this.uid);
          this.user.id = Date.now();
          this.afProvider.createNewUser(this.uid, this.user);
          load.dismiss();
          load.onDidDismiss(()=>{
            this.navCtrl.pop();
          })
        }
      }).catch(e=>{
        alert(e);
        console.log(e);
        load.dismiss();
        load.onDidDismiss(()=>{
          this.navCtrl.pop();
        })
      });
    }else{
      alert('Las contraseñas no coinciden')
    }
    
  }

}
