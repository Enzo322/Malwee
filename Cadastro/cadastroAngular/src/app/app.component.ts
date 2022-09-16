import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'cadastroAngular';
  usuario: string = '';
  telefone: string = '';
  index: number = 0;
  novoUsuario=[{nome: "",tel: ""}];

  constructor(private httpClient: HttpClient){

  }
  public addPessoa(){
    this.novoUsuario.push({nome: this.usuario, tel: this.telefone});
  }
}