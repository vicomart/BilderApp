import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import {
  ModalController,
  AlertController,
  ActionSheetController
} from '@ionic/angular';




@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  tempImages = [];
  cargandoGeo = false;
  private win: any = window;
  


  post = {
    mensaje: '',
    coords: null,
    posicion: false
  }
  
  

  constructor(
    private webview: WebView,
    private postService: PostsService,
    private route: Router, 
    private geolocation: Geolocation, 
    private camera: Camera,
    public actionSheetCtrl: ActionSheetController, ) {

  }

  async crearPost(){
    console.log(this.post);
    const creado = await this.postService.crearPost( this.post);

    this.post = {
      mensaje: '',
      coords: null,
      posicion: false
    };

     this.route.navigateByUrl('/main/tabs/tab1');
  }

  getGeo(){

    if (!this.post.posicion){
      this.post.coords = null;
      return;
    }

    this.cargandoGeo = true;
    
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.cargandoGeo = false;

      const coords = `${resp.coords.latitude},${resp.coords.longitude}`;

      this.post.coords = coords;
      console.log(coords);


     }).catch((error) => {
       console.log('Error getting location', error);
      this.cargandoGeo = false;

     });

  }

  // camara(){

  //   const options: CameraOptions = {
  //     quality: 60,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     sourceType: this.camera.PictureSourceType.CAMERA
  //   }

  //   this.procesarImg(options);
    

  // }

  // libreria(){
  //   const options: CameraOptions = {
  //     quality: 60,
  //     destinationType: this.camera.DestinationType.FILE_URI,
  //     encodingType: this.camera.EncodingType.JPEG,
  //     mediaType: this.camera.MediaType.PICTURE,
  //     correctOrientation: true,
  //     sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  //   }

  //   this.procesarImg(options);
  // }
  
  procesarImg(options: CameraOptions){
    

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      console.log(imageData);
      
      const img = this.win.Ionic.webview.convertFileSrc(imageData);
      console.log(img);

      this.postService.subirImagen(imageData);
      this.tempImages.push(img);
     }, (err) => {
      // Handle error
     });
  }


pickImage(sourceType) {
      console.log("pickImage: ");
      const options: CameraOptions = {
        quality: 70,
        sourceType: sourceType,
        destinationType: this.camera.DestinationType.FILE_URI,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
      this.camera.getPicture(options).then((imagePath) => {
        console.log("imagePath1: "+imagePath);
  
        console.log("imagePath2: "+JSON.stringify(imagePath));
        // this.nameImage="av
    var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
          // this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
          this.tempImages.push(imagePath)
      }, (err) => {
        console.log(err);
      });
  
  }

  

  async presentActionSheet_android() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Mamalon',
      buttons: [{
        text: 'Ruta',
        role: 'destructive',
        icon: 'camera',
        handler: () => {
          // this.takePhoto();
          this.pickImage(this.camera.PictureSourceType.CAMERA);
          console.log('takePicture obj_camara');
        }
      }, {
        text: 'Galeria',
        icon: 'images',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
          console.log('Share obj_galeria');
        }
      },
       {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }



}
