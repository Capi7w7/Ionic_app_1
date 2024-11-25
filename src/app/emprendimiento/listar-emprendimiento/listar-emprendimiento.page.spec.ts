import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEmprendimientoPage } from './listar-emprendimiento.page';

describe('ListarEmprendimientoPage', () => {
  let component: ListarEmprendimientoPage;
  let fixture: ComponentFixture<ListarEmprendimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarEmprendimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
