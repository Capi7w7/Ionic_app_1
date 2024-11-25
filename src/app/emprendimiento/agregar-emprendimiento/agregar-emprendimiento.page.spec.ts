import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarEmprendimientoPage } from './agregar-emprendimiento.page';

describe('AgregarEmprendimientoPage', () => {
  let component: AgregarEmprendimientoPage;
  let fixture: ComponentFixture<AgregarEmprendimientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarEmprendimientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
