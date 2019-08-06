import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ObtenerArregloService } from '../obtener-arreglo.service';
import { By } from '@angular/platform-browser';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent ],
      imports: [FormsModule,
        HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [ObtenerArregloService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("La tabla deberia mostrar todas las filas si el limite es 0", () =>{
    const lineasObjetosDatos = component.vehiculos.length;
    const lineaCabecera = 1;
    let array = fixture.debugElement.queryAll(By.css("tr"));
    console.log("Este es un array:", array);
    const lineasTablaEnHtml = fixture.debugElement.queryAll(By.css("tr")).length;
    
    expect(lineasObjetosDatos+lineaCabecera).toBe(lineasTablaEnHtml);
  }); 

  it("La tabla no deberia mostrar las filas con velocidad menor a 85 si el limite es 100", ()=>{
    const HTMLInputLimite = fixture.debugElement.query(By.css("input[name=limite]")).nativeElement;
    HTMLInputLimite.value = 100;
    HTMLInputLimite.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const filaCabecera = 1;
    const filaAMostrar = component.vehiculos.filter(fila => parseInt(fila.velocidad) >= 85).length + filaCabecera;

    const lineasTablaEnHtml = fixture.debugElement.queryAll(By.css("tr")).length;
    expect(filaAMostrar).toBe(lineasTablaEnHtml);
  });
});
