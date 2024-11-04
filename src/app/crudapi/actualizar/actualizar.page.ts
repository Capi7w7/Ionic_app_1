import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from 'src/app/apiservice.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-actualizar',
  templateUrl: './actualizar.page.html',
  styleUrls: ['./actualizar.page.scss'],
})
export class ActualizarPage implements OnInit {

  constructor(private apiService: ApiserviceService, private activatedRoute: ActivatedRoute, private router: Router) { }

  userId: string='';

  ngOnInit() {

    this.activatedRoute.paramMap.subscribe(params => {
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


}
