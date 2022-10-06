import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'Login';
  cpf: string ='';
  senha: string ='';
  log: boolean = false;
  constructor(private httpClient: HttpClient, private router: Router) { }
  

  public login(){
    this.httpClient.post('http://localhost:3005/login', {cpf: this.cpf, senha: this.senha}).toPromise().then((Response: any)=>{
      if(Response.auth){
        this.log = true;
        window.localStorage.setItem('token', Response.token);
        
        this.router.navigate(['/cadastro'])
        console.log("Logado");
      }
    })
  }

}


