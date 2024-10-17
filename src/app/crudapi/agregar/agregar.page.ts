import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  constructor(private alertController: AlertController,private route:ActivatedRoute, private apiService: ApiserviceService) { }

  userId: string='';

  ngOnInit() {
    this.promptForName();
  }

  async promptForName() {
    const alert = await this.alertController.create({
      header: 'Enter Your mail',
      inputs: [
        {
          name: 'mail',
          type: 'text',
          placeholder: 'Your Name'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: (data) => {
            this.getIdFromMail(data.name);
          }
        }
      ]
    })
  }

  private getIdFromMail(name: string) {
    this.apiService.obtenerPorMail(name).subscribe(
      data => {
        if (data) {
          this.userId = data[0].id;
          console.log('User ID:', this.userId);
          // Now you can use this ID for deletion or other operations
        } else {
          console.log('User not found');
        }
      },
      error => console.error('Error fetching user ID:', error)
    );
  }


  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
  
  }

  

  private async saveImage(image: string) {
    const fileName = new Date().getTime() + '.jpeg';
    const filePath = `assets/images/${fileName}`;
    const savedFile = await Filesystem.writeFile({
      path: filePath,
      data: image,
      directory: Directory.Data
    });

    this.apiService.actualizarImg(this.userId, filePath ).subscribe(
      response => {
        console.log('Image path updated in API:', response);
      },
      error => {
        console.error('Error updating image path in API:', error);
      }
    );

  }

  

}
