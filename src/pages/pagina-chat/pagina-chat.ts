import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { User } from '../../modal/user';

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

  uid: any;
  user = {} as User;
  id_other : any;
  userData : any;
  chats: any[];
  messages: any[];
  message = {
    content : null,
    id: null,
    from: null
  };
  chat_id: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afProvider: AngularFireProvider
    ) {
      
      this.uid = navParams.get('uid');
      this.id_other = navParams.get('id_other');
      this.user.id = navParams.get('id');

      console.log(this.uid);
      console.log(this.id_other);
      console.log(this.user.id);

      this.afProvider.getChat(this.uid).valueChanges().subscribe(chats=>{
        this.chats = chats;
        console.log(this.chats);
        for(var n = 0; n < this.chats.length; n++){
          if(this.chats[n].id === this.user.id && this.chats[n].id_other === this.id_other){
            this.chat_id = this.chats[n].chat_id;
            this.afProvider.getMessages(this.chat_id).valueChanges().subscribe(messages=>{
              this.messages = messages;
              console.log(this.messages);
            })
            break
          }
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaChatPage');
  }


  newMessage(){
    this.message.from = this.user.id;
    this.message.id = Date.now();
    this.afProvider.newMessage(this.chat_id, this.message);
  }

}
