import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarpublicarPage } from './listarpublicar.page';

describe('ListarpublicarPage', () => {
  let component: ListarpublicarPage;
  let fixture: ComponentFixture<ListarpublicarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarpublicarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
