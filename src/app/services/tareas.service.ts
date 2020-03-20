import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

  listas: Lista[] = [];



  constructor() {
    this.cargarStorage();
   }

   crearLista(titulo: string) {
    const newList = new Lista(titulo);
    this.listas.push(newList);
    this.guardarStorage();
    return newList.id;
   }

    borrarLista(lista: Lista) {
      this.listas = this.listas.filter(listaData => listaData.id !== lista.id);
      this.guardarStorage();
    }

   cargarLista(id: string | number) {

    id = Number(id);

    return this.listas.find( listaData => listaData.id === id );

   }

   guardarStorage() {
    localStorage.setItem('data', JSON.stringify(this.listas));
   }

   cargarStorage() {
    if (localStorage.getItem('data')) {
      this.listas = JSON.parse(localStorage.getItem('data'));
    }
   }
}
