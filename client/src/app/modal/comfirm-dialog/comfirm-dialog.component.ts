import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: ['./comfirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  title:String;
  message:String;
  btnOkText:string;
  btnCancelText:string;
  result: boolean;
  constructor(public bsModalRef:BsModalRef) { }

  ngOnInit(): void {
  }
  confirm(){
    this.result=true;
    this.bsModalRef.hide();
  }
  decline(){
    this.result=false;
    this.bsModalRef.hide();
  }

}
