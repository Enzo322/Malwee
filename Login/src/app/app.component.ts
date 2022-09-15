import { Component, OnInit } from '@angular/core';
import { AppServiceService } from './app-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Login';

  constructor(private service : AppServiceService){

  }

  ngOnInit(): void {
    this.getUsersFromAPI();
  }
  getUsersFromAPI(){
    this.service.getUsers().subscribe((Response) =>{
      console.log("Response from API is ",Response);

    },(error)=>{
      console.log("Error is ", error);
    })
  }
}


