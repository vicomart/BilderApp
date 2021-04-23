import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonSlides, NavController } from '@ionic/angular';
import { UserServiceService } from 'src/app/services/user-service.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, AfterViewInit {

  @ViewChild('slidePrincipal') slides: IonSlides;


  loginUser = {
    email: 'manush@gmail.com',
    password: '123456'
  }

  registroUsusario: Usuario = {
    email: 'test',
    password: '123456',
    nombre: 'Test',
    avatar: 'av-1.png'
  };

  constructor(private usuarioService: UsuarioService, private navCtrl: NavController, private userService: UserServiceService) { }

  ngOnInit() {
    // this.slides.lockSwipes(true); 
  }
  ngAfterViewInit(){
    this.slides.lockSwipes( true );//Bloque del Slide principal.
 }

  async login(fLogin: NgForm){

    if (fLogin.invalid){ return;}
    
    const valido =  await this.usuarioService.login( this.loginUser.email, this.loginUser.password );
    
    if (valido){
      //Navegar a tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', {animated: true} );
    }else{
      //mostrar alerta de usuarios y contraseñas no correctos
      this.userService.alertaNoacceso('Usuario y Contraseña son incorrectos.');
    }
  }
  async registro(fRegistro: NgForm){

    if (fRegistro.invalid) {return;}

    const valido = await this.usuarioService.registro(this.registroUsusario);

    if (valido){
      //Navegar a tabs
      this.navCtrl.navigateRoot( '/main/tabs/tab1', {animated: true} );
    }else{
      //mostrar alerta de usuarios y contraseñas no correctos
      this.userService.alertaNoacceso('El correo electronico ya existe.');
    }
    
    
  }
 
  mostrarRegistro(){
      this.slides.lockSwipes(false);
      this.slides.slideTo(0);
      this.slides.lockSwipes(true);

  }
  mostrarLogin(){
      this.slides.lockSwipes(false);
      this.slides.slideTo(1);
      this.slides.lockSwipes(true);

  }  

}
