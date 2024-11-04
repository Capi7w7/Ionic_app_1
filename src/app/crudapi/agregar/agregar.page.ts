
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AlertController } from '@ionic/angular';



@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {



  capturedImage: string | undefined;

  constructor(
  private alertController: AlertController,
  private route:ActivatedRoute, 
  private apiService: ApiserviceService,
  private router:Router) { }

  userId: string='';

  ngOnInit() {

    Camera.requestPermissions();

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = idParam;
      } else {
        console.error('No ID provided');
      }
    });

  }

  async irAinicio(){
    this.router.navigate(['/inicio',this.userId]);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 40,
      allowEditing: true,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });

    this.capturedImage = image.dataUrl
    }
  

  

  async saveImage() {
    if (this.capturedImage) {
      const fileName = new Date().getTime() + '.jpeg';
      const filePath = `assets/images/${fileName}`;
      const savedFile = await Filesystem.writeFile({
        path: filePath,
        data: this.capturedImage,
        directory: Directory.Data
      });

      this.apiService.actualizarImg(this.userId, filePath).subscribe(
        response => {
          console.log('imagen actualizada:', response);
          this.showAlert('Exito', 'Imagen guarada');
        },
        error => {
          console.error('Error:', error);
          this.showAlert('Error', 'Fallo al cargar la imagen');
        }
      );
    } else {
      this.showAlert('Error', 'No hay imagen');
    }
  }

    async showAlert(header: string, message: string) {
      const alert = await this.alertController.create({
        header: header,
        message: message,
        buttons: ['OK']
      });
      await alert.present();
    }

createDir(){
  Filesystem.mkdir({
    path: '',
    directory: Directory.Documents,
  }).then(() => {
    console.log('Directorio creado');
  }).catch(error => {
    console.error('Error al crear el directorio', error);
  });
}



}
