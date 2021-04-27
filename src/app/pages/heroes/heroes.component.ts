import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from '../../models/heroe.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: HeroeModel[] = [];

  cargando = false; 
  constructor(private heroesServices:HeroesService) { }

  ngOnInit(): void {
    this.cargando = true;
    this.heroesServices.getHeroes().subscribe(res => {
      this.heroes = res;
       this.cargando = false;
    })
  }
  borrarHeroe(heroe: HeroeModel, i: number) {
    
    Swal.fire({
      title: `¿Estás seguro que deseas eliminar a ${heroe.nombre}`,
      icon: 'question',
      showCancelButton: true,
      showConfirmButton: true,
    }).then(resp => {
      if (resp.value) {
        this.heroesServices.BorrarHeroe(heroe.id).subscribe(res => {
          this.heroes.splice(i, 1);
          
        });
      }
    });
    
  }
}
