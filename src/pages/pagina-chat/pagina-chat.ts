import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import { AngularFireProvider } from '../../providers/angular-fire/angular-fire';
import { User } from '../../modal/user';
import { Observable } from 'rxjs';
import * as firebase from 'firebase/app'; 
import 'firebase/firestore';



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
  @ViewChild(Content) content: Content;
  uid: any;
  user = {} as User;
  id_other : any;
  userData : any;
  chats: any[];
  messages: any[];
  message = {
    content : null,
    id: null,
    from: null,
    date: null,
    hr: null,
    fullDate: null
  };
  chat_id_1: string;
  chat_id_2: string;
  chat_id: string;

  dia : any;
  mes : any;
  ano : any;

  hora : any;
  minutos : any;
  segundos : any;

  fullDateTime: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private afProvider: AngularFireProvider
    ) {
      
      this.uid = navParams.get('uid');
      this.id_other = navParams.get('id_other');
      this.user.id = navParams.get('id');
      this.user.name = navParams.get('name');

      console.log(this.uid);
      console.log(this.id_other);
      console.log(this.user.id);

      this.chat_id_1 = (this.user.id).toString()+(this.id_other);
      this.chat_id_2 = (this.id_other)+(this.user.id).toString()
      console.log(this.chat_id_1, this.chat_id_2);

      let chat_data;
      this.afProvider.getChatData(this.chat_id_1).valueChanges().subscribe(data=>{
        chat_data = data;
        console.log(chat_data);
        if(chat_data === null){
          console.log('Sin Datos!');
          this.afProvider.getChatData(this.chat_id_2).valueChanges().subscribe(data =>{
            chat_data = data;
            console.log(chat_data);
            if(chat_data === null){
              console.log('Definitivamente sin datos!');
              this.createChatRoom(this.chat_id_1);
            }else{
              console.log(chat_data.id);
              this.chat_id = chat_data.id;
              this.getAllMessages(this.chat_id);
            }
          })
        }else{
          console.log(chat_data.id);
          this.chat_id = chat_data.id;
          this.getAllMessages(this.chat_id);
        }
      });


      let dateNow = firebase.firestore.Timestamp.now()
      console.log(dateNow);
      this.dia = new Date(dateNow.toMillis()).getDate();
      console.log(this.dia);
      this.mes = new Date(dateNow.toMillis()).getMonth();
      this.ano = new Date(dateNow.toMillis()).getFullYear();
      this.hora = new Date(dateNow.toMillis()).getHours();
      this.minutos = new Date(dateNow.toMillis()).getMinutes();
      this.segundos = new Date(dateNow.toMillis()).getSeconds();
      let milisegundos = new Date(dateNow.toMillis()).getMilliseconds();

      //console.log(new Date(this.ano, this.mes, this.dia, this.hora, this.minutos, this.segundos, milisegundos));

      this.fullDateTime = new Date(this.ano, this.mes, this.dia, this.hora, this.minutos, this.segundos, milisegundos);

      
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PaginaChatPage');
  }

  createChatRoom(chat_id){
    console.log('Creando Datos de Chat-Room')
    let chat_data = {
      data : {
        id : chat_id,
        content : 'Sala de chat'
      }
    };
    this.afProvider.createChatRoom(chat_data);
  }

  getAllMessages(chat_id){
    this.afProvider.getMessages(chat_id).valueChanges().subscribe(messages=>{
      this.messages = messages;
      if(this.messages){
        this.scrollToBottom();
      }
    })
  }


  newMessage(){
    let id = firebase.firestore.Timestamp.now().toMillis();
    console.log(id);
    console.log(this.chat_id);
    console.log(this.message.content);
    let fecha = this.dia+'-'+this.mes+'-'+this.ano;
    let hora = this.hora+':'+this.minutos;
    console.log(fecha, hora)
    this.message.date = fecha;
    this.message.hr = hora;
    this.message.fullDate = this.fullDateTime;
    if((this.message.content === null)||(this.message.content === '')){
      console.log('No se envía mensaje')
    }else{
      this.message.from = this.user.id;
      this.message.id = id
      console.log(this.message.date);
      this.afProvider.newMessage(this.chat_id, this.message);
      this.message.content = null;
      this.getAllMessages(this.chat_id);
    }
    this.scrollToBottom();
  }

}
