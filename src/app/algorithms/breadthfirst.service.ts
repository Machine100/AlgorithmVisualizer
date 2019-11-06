import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class BreadthfirstService {

constructor(private displayControl:DisplaycontrolService) { }

fillAll(){
    let row:number = 0
    let column:number = 0
    for (row=0; row<10; row++){
      for (column=0; column<10; column++){
        this.displayControl.fillCell(row,column)
      } 
    }
  }

  clearAll(){
    let row:number = 0
    let column:number = 0
    for (row=0; row<10; row++){
      for (column=0; column<10; column++){
        this.displayControl.clearCell(row,column)
      } 
    }
  }

  runAlgo() {

  }

}
