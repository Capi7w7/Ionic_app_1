import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from 'src/app/apiservice.service';

@Component({
  selector: 'app-listar-emprendimiento',
  templateUrl: './listar-emprendimiento.page.html',
  styleUrls: ['./listar-emprendimiento.page.scss'],
})
export class ListarEmprendimientoPage implements OnInit {

  emprendimientos: any[] = [];
  userId!: string;

  constructor(private apiService: ApiserviceService,
              private route: ActivatedRoute
  ) {}

  ngOnInit() {
    

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.userId = idParam; 
      } else {
        console.error('No ID provided');
      }
    });
  }

  
}


