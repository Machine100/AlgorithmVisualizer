import { Injectable } from '@angular/core';
import { Cell } from './models/cell'

@Injectable({
  providedIn: 'root'
})
export class DisplaycontrolService {

  constructor() { }

  cursorRow: number                     
  cursorColumn: number
  board: Cell[][]       //a 2D array of objects representing each space on the maze

  private _getId(row:number, column:number) {
    return row.toString() + column.toString()
  }

  initBoard() {
    let row:number = 0
    let column:number = 0
    this.board = [ [],[],[],[],[],[],[],[],[],[] ] 
    for (row=0; row<10; row++){
      for (column=0; column<10; column++){
          this.board[row][column] = {
            id: row.toString()+column.toString(),
            visited: false,
            filled: false,
            startCell: false,
            finishCell: false,
            wallUp: true,
            wallDown: true,
            wallLeft: true,
            wallRight: true
          }
      }
    }
    console.log('board:',this.board)
  }

    redrawBoard (){
    let row:number = 0
    let column:number = 0
    for (row=0; row<10; row++){
      for (column=0; column<10; column++){
        const id:string = this._getId(row, column)
        let up:boolean = this.board[row][column].wallUp
        let down:boolean = this.board[row][column].wallDown
        let left:boolean = this.board[row][column].wallLeft
        let right:boolean = this.board[row][column].wallRight
        let filled:boolean = this.board[row][column].filled
        let startCell:boolean = this.board[row][column].startCell 
        let finishCell:boolean = this.board[row][column].finishCell
        if (up) { document.getElementById(id).classList.add('u') }
        if (!up) { document.getElementById(id).classList.remove('u') }
        if (down) { document.getElementById(id).classList.add('d') }
        if (!down) { document.getElementById(id).classList.remove('d') }
        if (left) { document.getElementById(id).classList.add('l') }
        if (!left) { document.getElementById(id).classList.remove('l') }
        if (right) { document.getElementById(id).classList.add('r') }
        if (!right) { document.getElementById(id).classList.remove('r') }
        if (filled) { document.getElementById(id).classList.add('filled') }
        if (!filled) { document.getElementById(id).classList.remove('filled') }
        if (startCell) { document.getElementById(id).classList.add('startCell') }
        if (!startCell) { document.getElementById(id).classList.remove('startCell') }
        if (finishCell) { document.getElementById(id).classList.add('finishCell') }
        if (!finishCell) { document.getElementById(id).classList.remove('finishCell') }
      }
    }
  }

  fillCell (row:number, column:number) {
    const id:string = this._getId(row, column)
    this.board[row][column].filled = true                   //update state  
    document.getElementById(id).classList.add('filled')     //update element
  }

  clearCell (row:number, column:number) {
    const id:string = this._getId(row, column)
    this.board[row][column].filled = true                   //update state  
    document.getElementById(id).classList.remove('filled')  //update element
  }

  markStart (row:number, column:number) {
    const id:string = this._getId(row, column)
    this.board[row][column].startCell = true                //update state
    document.getElementById(id).classList.add('start-cell')  //update element
  }

  markFinish (row:number, column:number) {
    const id:string = this._getId(row, column)
    this.board[row][column].finishCell = true               //update state
    document.getElementById(id).classList.add('finish-cell')  //update element 
  }  

}
