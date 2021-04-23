import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from '../../interfaces/interfaces';
import { UserServiceService } from '../../services/user-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {
  
  usuario: Usuario = {};

  constructor(private usuarioService: UsuarioService, private userSService: UserServiceService) {}

  ngOnInit(){
  
    this.usuario = this.usuarioService.getUsuario();

    console.log(this.usuario);
  }

  async actualizar(fActualizar: NgForm){
    if (fActualizar.invalid) {return;}

    const actualizado = await this.usuarioService.actualizarUsuario(this.usuario);
    console.log(actualizado);
    if( actualizado ) {
      //Actializacion exitosa
      this.userSService.presentToast('Actualización Exitosa :)');
    }else{
      //Error en la actualizacion
      this.userSService.presentToast('No se pudo Actualizar :(');
    }
  }

  logout(){
    
  }

}
