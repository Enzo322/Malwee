import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { NewGroupComponent } from '../new-group/new-group.component';
export interface DialogData {
  grupo: string;
  id: number;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  descricao : string = "";
  grupos : Array<any> = [];

  grupo : string = "";
  subGrupo : string = "";
  search : string = '';
  id: number = 0;
  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  openPutModal(grupo : any): void {
    this.dialog.open(ModalComponent, {
      width: '550px',
      data: grupo
    });
  }

  openPostModal(): void {
    this.dialog.open(NewGroupComponent, {
      width: '550px',
      data: null
    });
  }

  async get(){
    this.grupos = await this.httpService.get('group');
  }

  // async patch(){
  //   this.grupos = await this.httpService.patch('grupo');
  // }  


}