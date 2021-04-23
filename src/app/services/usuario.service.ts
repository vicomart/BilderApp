import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/interfaces';
import { NavController } from '@ionic/angular';


const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token: string = null;
  private usuario: Usuario = {};

  constructor(private http: HttpClient, private storage: Storage, private navCtrl: NavController) { }


  login(email: string, password: string){

    const data = { email, password};

    return new Promise(resolve => {
         this.http.post(`${url}/user/login`, data).subscribe(resp => {
           console.log(resp);
           this.storage.create();
           if (resp['ok']) {
               this.guardarToken(resp['token']);
               resolve(true);
           }else{
             this.token = null; //Receteamos el token
             this.storage.clear();
             resolve(false);
           }
         });

    })

  }

  registro(usuario: Usuario){

    return new Promise(resolve => {
      this.http.post(`${url}/user/create`, usuario).subscribe(resp =>{
        console.log(resp);
        this.storage.create();
        if (resp['ok']) {
          this.guardarToken(resp['token']);
          resolve(true);
        }else{
        this.token = null; //Receteamos el token
        this.storage.clear();
        resolve(false);
         }
      })
    });
  }

  async guardarToken( token: string ){   
    this.token = token;
    await this.storage.set('token', token);
  }

  getUsuario(){

    if ( !this.usuario._id){
      this.validarToken();
    }
    return {...this.usuario};
  }

  async cargarToken(){
    this.token = await this.storage.get('token') || null;
  }

  async validarToken(): Promise<boolean>{
    this.storage.create()

    await this.cargarToken();

    if (!this.token){
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    return new Promise<boolean>( resolve =>{

      const headers = new HttpHeaders({
        'x-token': this.token
      });
       
      this.http.get(`${url}/user`, {headers}).subscribe( resp => {

        if ( resp['ok']){
          this.usuario = resp['usuario'];
          resolve(true);
        }else {
          this.navCtrl.navigateRoot('/login');
          resolve(false);
        }

      })
    });
  }

  actualizarUsuario(usuario: Usuario){
    const headers = new HttpHeaders({
      'x-token': this.token
    });


    return new Promise(resolve =>{
      this.http.post(`${url}/user/update`, usuario, {headers}).subscribe(resp =>{

        if (resp['ok']){
          this.guardarToken(resp['token']);
          resolve(true);
        }else{
          resolve(false);
        }
      });
    });

    
  }

  
}
