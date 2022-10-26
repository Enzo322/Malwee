import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { HttpService } from 'src/services/http.service';

export interface DialogData {
  grupo: string;
  id: number;
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  descricao : string = "";
  grupos : Array<any> = [];

  grupo : string = "";
  subGrupo : string = "";
  id : number = 1;
  constructor(public dialogRef: MatDialogRef<ModalComponent>, private httpService : HttpService) { }

  ngOnInit(): void {
    const data : any = this.dialogRef.getState();

    if (!data){
      return;
    }
    //pesquisar como pegar os parametros do data
    //tirar o new group e colocar no modal
    //pegar o delete do daniel
    this.id = data.id,
    this.grupo = data.grupo;
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  public putItens(){
    this.putGrupo();
    this.putSubGrupo();
  }

  async putGrupo(){
    this.grupos = await this.httpService.put('grupo', {descricao : this.grupo, idGrupo : this.id});
  }  
  
  async putSubGrupo(){
    this.grupos = await this.httpService.put('grupo', {tipoProduto : this.subGrupo, fkGroup : this.id});
  }
}
