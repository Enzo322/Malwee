import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})

export class CadastroComponent implements OnInit {
  title = 'cadastroAngular';
  usuario: string = '';
  telefone: string = '';
  index: number = 0;
  idcontatos: number = 0;
  novoUsuario=[{nome: "",tel: ""}];
  
  pessoas: Array<any> = [];
  constructor(private httpClient: HttpClient){

  }
  ngOnInit(): void {
  }

  public listarPessoas(){
    this.httpClient.get("http://localhost:3005/contatos").toPromise().then((response: any)=>{
      console.log(response);
      this.pessoas = response;
    })
  }
  public addPessoa(){
    this.httpClient.post("http://localhost:3005/contatos",{nome: this.usuario, telefone: this.telefone}).toPromise().then((response: any)=>{
      console.log(response);
    });
    this.novoUsuario.push({nome: this.usuario, tel: this.telefone});
  }
  public delete(){
    this.httpClient.post('http://localhost:3005/delete', {idcontatos: this.idcontatos}).toPromise().then((Response: any)=>{
      console.log(Response);
    })
  }

}
