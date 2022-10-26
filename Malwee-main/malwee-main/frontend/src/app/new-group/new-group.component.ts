import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  grupo: string;
}
@Component({
  selector: 'app-new-group',
  templateUrl: './new-group.component.html',
  styleUrls: ['./new-group.component.scss']
})
export class NewGroupComponent implements OnInit {
  grupos : Array<any> = [];
  grupo : string = "";
  constructor(public dialogRef: MatDialogRef<NewGroupComponent>, private httpService : HttpService) { }

  ngOnInit(): void {
  }

  async postGroup(){
    console.log(this.grupo);
    this.grupos = await this.httpService.post('group',{descricao : this.grupo})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
