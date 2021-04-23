import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor(private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  
  async alertaNoacceso( message: string) {
    const alert = await this.alertCtrl.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }
}
