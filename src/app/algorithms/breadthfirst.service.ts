import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class BreadthfirstService {

constructor(private displayControl:DisplaycontrolService) { }

sourceStack: string[]           // ids of nodes from where algo found the node
stateStack: string[]            // state of the node
traversalStack: string[]        // main output of the search algorithm
stackpointer: number            // points to an index on the traversalStack

init() {
  console.log('at init()')
  this.sourceStack = []
  this.stateStack = []
  this.traversalStack = []
  this.stackpointer = 0
  this.displayControl.cursorRow = this.displayControl.startRow
  this.displayControl.cursorColumn = this.displayControl.startColumn
  this.traversalStack[0] = this.displayControl.getId(this.displayControl.startRow,this.displayControl.startColumn)                            // set first entry in traversalStack to start position
}

runAlgo() {
  this.stepAlgo()
  }

stepAlgo() {
  console.log('at stepAlgo()')
  console.log(this.traversalStack)
  console.log()
                                             
    this.processNeighbors()   //visit all neighbors and place unvisited ones onto traversalStack
    this.displayControl.markVisited(this.displayControl.cursorRow,this.displayControl.cursorColumn)  // mark current node as visited on the board
                                                // if traversalStack is empty, traversal is complete
    ++this.stackpointer                         // move stack pointer to next stack location
    const destinationCursorId:string = this.traversalStack[this.stackpointer]
    const destinationCursorRowCol:number[] = this.displayControl.getRowColumn(destinationCursorId)
    this.displayControl.moveCursor(destinationCursorRowCol[0],destinationCursorRowCol[1])
  }

processNeighbors () {

    console.log ('cursor at:', this.displayControl.cursorRow,this.displayControl.cursorColumn)
    this._processDown()           // validate each direction
    this._processRight()
    this._processUp()      
    this._processLeft()
}

  private _processDown () {
    if (this.displayControl.cursorRow = 9) { return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow + 1
    const destinationColumn = this.displayControl.cursorColumn
    console.log('for down, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
      this.traversalStack.push(destinationId)
    }
    return
  }
  
  private _processRight () {
    if (this.displayControl.cursorColumn = 9) { return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow
    const destinationColumn = this.displayControl.cursorColumn + 1
    console.log('for Right, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
      this.traversalStack.push(destinationId)
    }
    return
  }

  private _processUp () {
    if (this.displayControl.cursorRow = 0) { return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow - 1
    const destinationColumn = this.displayControl.cursorColumn
    console.log('for up, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
      this.traversalStack.push(destinationId)
    }
    return
  }
  
  private _processLeft () {
    if (this.displayControl.cursorColumn = 0) { return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow
    const destinationColumn = this.displayControl.cursorColumn - 1
    console.log('for left, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
      this.traversalStack.push(destinationId)
    }
    return
  }


}
