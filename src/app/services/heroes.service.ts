import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';

import Swal from 'sweetalert2';

import { map ,delay} from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  constructor(private http: HttpClient) { }
  private url = "https://login-app-c1dae-default-rtdb.firebaseio.com"
  crearHeroe(heroe:HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((res:any) => {
          heroe.id = res.name;
          return heroe;
        })
      );
    

  }

  actualizarHeroe(heroe: HeroeModel) {
    
    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp);

  }
  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(this.crearArreglo),
        delay(1500)
        
        );
     
  }
BorrarHeroe(id:String){
  return this.http.delete(`${this.url}/heroes/${id}.json`)
}
  
  
  getHeroe(id: string) {
    return this.http.get(`${this.url}/heroes/${id}.json`)
    
  }
  private crearArreglo(heroesObj: object) {

    const heroes: HeroeModel[] = [];

    Object.keys(heroesObj).forEach(key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    // if (heroesObj === null) { return [];}
      
   
    return heroes;
  }
}
