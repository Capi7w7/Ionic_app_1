
import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AlertController } from '@ionic/angular';
import { Storage } from '@angular/fire/storage'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {


  image: any;
  capturedImage: string | undefined;

  constructor(
  private alertController: AlertController,
  private route:ActivatedRoute, 
  private apiService: ApiserviceService,
  private router:Router,
  private storage: Storage
) { }

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

     this.takePicture()

  }

  async irAinicio(){
    this.router.navigate(['/eliminar',this.userId]);
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
      width: 600,
    });

    this.image = image.dataUrl
    const blob = this.dataURLtoBLob(image.dataUrl);
    const url = await this.uploadImage(blob, image);
    console.log(url);
    
    }
  
  dataURLtoBLob(dataurl: any){
    var arr = dataurl.split(','), mine = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    
    while(n--){
      u8arr[n] = bstr.charCodeAt(n);
    } 
    return new Blob([u8arr], {type:mine});
  }
  
  async uploadImage(blob: any, imageData: any) {

    try{
      const currentDate = Date.now();
      const filepath = `Profile-pictures/${currentDate}.${imageData.format}`;
      const fileRef = ref(this.storage, filepath);
      const task = await uploadBytes(fileRef, blob);
      console.log('task', task);
      const url = getDownloadURL(fileRef);
      return url;
    }
    catch(error){
      console.error('Error al subir la imagen');
      throw(error);
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
