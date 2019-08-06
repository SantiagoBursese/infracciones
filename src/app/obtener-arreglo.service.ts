import { Injectable } from '@angular/core';
import { IDatosVehiculo } from './i-datos-vehiculo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ObtenerArregloService {
  vehiculos:Array<IDatosVehiculo>;

  constructor(
    private http:HttpClient
  ) { }

  getVehiculos():Observable<any>{
    return this.http.get('../assets/datos.json');
  }

}
