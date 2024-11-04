import {Component, HostBinding} from '@angular/core';
import { BaseService } from './Sqlite/base.service';
import { SplashScreen } from '@capacitor/splash-screen';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(private baseService: BaseService) {
    this.initApp();
  }

  async initApp() {
    await this.baseService.initializeDatabase();
    SplashScreen.hide();
  }
}




