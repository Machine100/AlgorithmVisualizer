import { Injectable } from '@angular/core';
import { Cell } from './models/cell'

@Injectable({
  providedIn: 'root'
})
export class DisplaycontrolService {

  constructor() { }

  startRow: number
  startColumn: number
  cursorRow: number                     
  cursorColumn: number
  board: Cell[][]       //a 2D array of objects representing each space on the maze

  getId(row:number, column:number) {
    return row.toString() + column.toString()
  }

  getRowColumn(id:string) {       // given a cell Id
    const result:string[] = id.split('')
    const location:number[] = []
    location[0] = Number(result[0])
    location[1] = Number(result[1])
    return (location)                // return the row and column
  }

  initBoard() {
    this.cursorRow = 0
    this.cursorColumn = 0
    let row:number = 0
    let column:number = 0
    this.board = [ [],[],[],[],[],[],[],[],[],[] ] 
    for (row=0; row<10; row++){
      for (column=0; column<10; column++){
          this.board[row][column] = {
            id: row.toString()+column.toString(),
            visited: false,
            filled: false,
            onStack: false,
            hasCursor: false,
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
        const id:string = this.getId(row, column)
        let up:boolean = this.board[row][column].wallUp
        let down:boolean = this.board[row][column].wallDown
        let left:boolean = this.board[row][column].wallLeft
        let right:boolean = this.board[row][column].wallRight
        let filled:boolean = this.board[row][column].filled
        let hasCursor:boolean = this.board[row][column].hasCursor
        let onStack:boolean = this.board[row][column].onStack
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
        if (hasCursor) { document.getElementById(id).classList.add('has-cursor') }
        if (!hasCursor) { document.getElementById(id).classList.remove('has-cursor') }
        if (onStack) { document.getElementById(id).classList.add('on-stack') }
        if (!onStack) { document.getElementById(id).classList.remove('on-stack') }
        if (startCell) { document.getElementById(id).classList.add('start-cell') }
        if (!startCell) { document.getElementById(id).classList.remove('start-cell') }
        if (finishCell) { document.getElementById(id).classList.add('finish-cell') }
        if (!finishCell) { document.getElementById(id).classList.remove('finish-cell') }
      }
    }
  }

  fillCell (row:number, column:number) {
    const id:string = this.getId(row, column)
    this.board[row][column].filled = true                   //update state  
    document.getElementById(id).classList.add('filled')     //update element
  }

  clearCell (row:number, column:number) {
    const id:string = this.getId(row, column)
    this.board[row][column].filled = true                   //update state  
    document.getElementById(id).classList.remove('filled')  //update element
  }

  markStart (row:number, column:number) {
    const id:string = this.getId(row, column)
    this.board[row][column].startCell = true                //update display state
    this.startRow = row                                     //update state store
    this.startColumn = column
    this.redrawBoard()
  }

  markFinish (row:number, column:number) {
    const id:string = this.getId(row, column)
    this.board[row][column].finishCell = true               //update display state
    this.startRow = row                                     //update state store
    this.startColumn = column
    this.redrawBoard()
  }  

  markVisited (row:number, column:number) {
    this.board[this.cursorRow][this.cursorColumn].visited = true
    const id = this.getId(row,column)
    document.getElementById(id).classList.add('visited')
  }

  markOffStack (row:number, column:number) {
     this.board[row][column].onStack = false               //update display state
  }

  markOnStack (row:number, column:number) {
     this.board[row][column].onStack = true                //update display state
  }

  moveCursor(destinationRow:number, destinationColumn:number){
    console.log(this.board)
    this.board[this.cursorRow][this.cursorColumn].hasCursor = false  //Update view
    this.cursorColumn = destinationColumn
    this.cursorRow = destinationRow
    this.board[destinationRow][destinationColumn].hasCursor = true   //update view
    console.log('currentcursorRow',this.cursorRow,'currentcursorColumn:',this.cursorColumn)
  }

  knockoutWalls(direction:string){
    console.log('at knockoutWalls','requesteddirection:',direction)
    switch (direction) {
      case 'down':
        this.board[this.cursorRow][this.cursorColumn].wallDown = false
        this.board[this.cursorRow + 1][this.cursorColumn].wallUp = false
        console.log('broke walls down')
        break
      case 'right':
        this.board[this.cursorRow][this.cursorColumn].wallRight = false
        this.board[this.cursorRow][this.cursorColumn + 1].wallLeft = false
        console.log('broke walls right')
        break
      case 'up':
        this.board[this.cursorRow][this.cursorColumn].wallUp = false
        this.board[this.cursorRow - 1][this.cursorColumn].wallDown = false
        console.log('broke walls up')
        break
      case 'left':
        this.board[this.cursorRow][this.cursorColumn].wallLeft = false
        this.board[this.cursorRow][this.cursorColumn - 1].wallRight = false
        console.log('broke walls left')
      }
  }
}
