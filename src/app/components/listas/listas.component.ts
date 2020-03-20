import { Component, Input, ViewChild } from '@angular/core';
import { TareasService } from '../../services/tareas.service';
import { Lista } from '../../models/lista.model';
import { Router } from '@angular/router';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent {

  @ViewChild( IonList, {static: true} ) lista: IonList;
  @Input() terminada = true;

  constructor(public tareasservice: TareasService,
              private router: Router,
              public alertController: AlertController) { }

  listaSeleccionada( list: Lista) {

    console.log(list);
    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${list.id}`);

    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${list.id}`);
    }

  }

  borrarLista(list: Lista) {
    this.tareasservice.borrarLista(list);
  }

  async editarLista(list: Lista) {
    const alert = await this.alertController.create({
      header: 'Editar lista',
      inputs: [{
        name: 'titulo',
        type: 'text',
        value: list.titulo
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Editar',
          handler: (data) => {
            if (data.titulo.length === 0) {
              return;
            }
            list.titulo = data.titulo;
            this.tareasservice.guardarStorage();
            this.lista.closeSlidingItems();
          }
        }
      ]
    });

    alert.present();
  }
}
