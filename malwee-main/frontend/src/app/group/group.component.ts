import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})

export class GroupComponent implements OnInit {
  private readonly baseUrl = 'http://localhost:3005/group';
  value = '';
  grupo : string = "";
  grupos=[{descricao: ""}];

  constructor(private router : Router, private HttpClient : HttpClient) { }

  ngOnInit(): void {
  }
  private makeHttpOptions(){
    const token = window.localStorage.getItem('token');

    return {
      headers : {
        'Authorization': 'bearer ' + token
      }
    }
  }
  public get(router : string) : Promise<any>{
    return this.HttpClient.get(this.baseUrl + this.router , this.makeHttpOptions()).toPromise();
  }

  public post(router : string, obj : any) : Promise<any>{
    return this.HttpClient.post(this.baseUrl + this.router, obj, this.makeHttpOptions()).toPromise();
  }


  public patch(router : string, obj : any) : Promise<any>{
    return this.HttpClient.patch(this.baseUrl + this.router, obj, this.makeHttpOptions()).toPromise();
  }  

  public put(router : string, obj : any) : Promise<any>{
    return this.HttpClient.put(this.baseUrl + this.router, obj, this.makeHttpOptions()).toPromise();
  }  

}
