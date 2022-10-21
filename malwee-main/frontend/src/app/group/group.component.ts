import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HttpService } from 'src/services/http.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData {
  grupo: string;
  subGrupo: string;
}

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  value = '';
  descricao : string = "";
  grupos : Array<any> = [];

  grupo : string = "";
  subGrupo : string = "";
  id : number = 1;


  constructor(private http : HttpClient, private httpService : HttpService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.get();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      width: '550px',
      data: {grupo: this.grupo, subGrupo: this.subGrupo},
    });
  }

  public putItens(){
    this.putGrupo();
    this.putSubGrupo();
  }

  async get(){
    this.grupos = await this.httpService.get('group');
  }

  // async post(){
  //   this.grupos = await this.httpService.post('grupo');
  // }

  // async patch(){
  //   this.grupos = await this.httpService.patch('grupo');
  // }  

  async putGrupo(){
    this.grupos = await this.httpService.put('grupo', {descricao : this.grupo, idGrupo : this.id});
  }  
  
  async putSubGrupo(){
    this.grupos = await this.httpService.put('grupo', {tipoProduto : this.subGrupo, fkGroup : this.id});
  }

}

export class ModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}