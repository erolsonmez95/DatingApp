import { Observable } from 'rxjs';
import { ConfirmDialogComponent } from './../modal/comfirm-dialog/comfirm-dialog.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ConfirmService {
  bsModelRef: BsModalRef;
 
  constructor(private modalService: BsModalService ) { }
 
  confirm(title = 'Confirmation\n',
          message = 'Are you sure you want to do this?',
          btnOkText = 'Ok',
          btnCancelText = 'Cancel'): Observable<boolean> {
      const config = {
        initialState: {
          title,
          message,
          btnOkText,
          btnCancelText
        }
      };
      this.bsModelRef = this.modalService.show(ConfirmDialogComponent,config);
   

   return new Observable<boolean>(this.getResult());
  } 


  private getResult(){
    return (observer) =>{
      const subscription = this.bsModelRef.onHidden.subscribe(()=>{
        observer.next(this.bsModelRef.content.result);
        observer.comple();
      })
      return{
        unsubscribe(){
          subscription.unsubscribe();
        }
      }
    }
  }
}


