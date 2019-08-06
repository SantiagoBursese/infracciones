import { Component, OnInit } from '@angular/core';
import { ObtenerArregloService } from '../obtener-arreglo.service';
import { IDatosVehiculo } from '../i-datos-vehiculo';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  registro:any;
  vehiculos:Array<IDatosVehiculo> = new Array<IDatosVehiculo>();

  categoriaLinea(registro:any,velocidadInf:number,velocidadSup:number):String{
    if(registro.velocidad >= velocidadSup)
      return 'text-danger';
    if(registro.velocidad >= velocidadInf && registro.velocidad <= velocidadSup)
      return 'text-warning';  

  }

  ocultarFilas(registro:any, minima:number):boolean{
    return registro.velocidad > minima;
  }

  valorMinimo(valorMaximo:number):number{
    return valorMaximo * 0.85;
  }

  asignar(param:any):any{
    return this.registro = param;
  }

  constructor(private infracciones: ObtenerArregloService) { 
    this.infracciones.getVehiculos()
    .subscribe(data => {
      data.sort((a:IDatosVehiculo,b:IDatosVehiculo)=> {return a.velocidad > b.velocidad? -1:1});
      this.vehiculos = data;
    });
  }

  ngOnInit() {

  } 
}
