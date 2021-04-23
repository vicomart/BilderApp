import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';
import { environment } from 'src/environments/environment';
import { Post, RespuestaPosts } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';


const url = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  paginaPosts = 0;

  nuevopost =  new EventEmitter<Post>();

  constructor( private http: HttpClient, private usuarioService: UsuarioService, private fileTransfer: FileTransfer) { }

  getPosts(pull: boolean = false){

    if (pull){
      this.paginaPosts = 0;
    }

    this.paginaPosts++;
    return this.http.get<RespuestaPosts>(`${url}/post/?pagina=${this.paginaPosts}`);
  }

  crearPost(post){
    const headers = new HttpHeaders({
      'x-token': this.usuarioService.token
    });

    return new Promise( resolve =>{
      this.http.post(`${url}/post`, post, {headers}).subscribe(resp =>{
        console.log(resp);
        this.nuevopost.emit(resp['post']);

        resolve(true);
      });

    });

    
  }

  subirImagen(img : string){

      const options: FileUploadOptions = {
        fileKey: 'image',
        headers: {
          'x-token': this.usuarioService.token
        }
      };

      const fileTransfer: FileTransferObject = this.fileTransfer.create();

      fileTransfer.upload( img, `${url}/post/upload`, options).then( data =>{
        console.log(data);
      }).catch( err => {
        console.log('error en carga', err);
      });
  }
}
