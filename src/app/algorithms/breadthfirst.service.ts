import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class BreadthfirstService {

constructor(private displayControl:DisplaycontrolService) { }

sourceStack: string[]           // ids of nodes from where algo found the node
traversalStack: string[]        // main output of the search algorithm
stackPointer: number            // points to an index on the traversalStack

init() {
  console.log('at init()')
  this.sourceStack = []
  this.traversalStack = []
  this.stackPointer = 0
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
  this.exploreNeighbors()   //visit all neighbors and place unexplored ones onto traversalStack
  if (this.stackPointer === this.traversalStack.length) {           //
    console.log ('algo complete')
    return
  }
  ++this.stackPointer                         // move stack pointer to next stack location
  const nextLocation:string = this.traversalStack[this.stackPointer]
  const destinationCursorRowCol:number[] = this.displayControl.getRowColumn(nextLocation)
  this.displayControl.moveCursor(destinationCursorRowCol[0],destinationCursorRowCol[1])
  }

exploreNeighbors () {

    console.log ('cursor at:', this.displayControl.cursorRow,this.displayControl.cursorColumn)
    this._processDown()           // validate each direction
    this._processRight()
    this._processUp()      
    this._processLeft()
    this.displayControl.markVisited(this.displayControl.cursorRow,this.displayControl.cursorColumn)  // mark current node as visited on the board
}

  private _processDown () {
    if (this.displayControl.cursorRow === 9) { console.log ('down rejected'); return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow + 1
    const destinationColumn = this.displayControl.cursorColumn
    const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
    const cursorId:string = this.displayControl.getId(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    console.log('for down, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    if (cell.onStack === true) { validMove = false }      //check if id is already explored
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
    }
    return
  }
  
  private _processRight () {
    if (this.displayControl.cursorColumn === 9) { console.log ('right rejected'); return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow
    const destinationColumn = this.displayControl.cursorColumn + 1
    const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
    const cursorId:string = this.displayControl.getId(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    console.log('for Right, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    if (cell.onStack === true) { validMove = false }      //check if id is already explored
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
    }
    return
  }

  private _processUp () {                // these look for new discoveries
    if (this.displayControl.cursorRow === 0) { console.log ('up rejected'); return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow - 1
    const destinationColumn = this.displayControl.cursorColumn
    const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
    const cursorId:string = this.displayControl.getId(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    console.log('for up, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    if (cell.onStack === true) { validMove = false }   //check if id is already explored
    if (validMove) {                                   //push node onto the traversal stack.
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
    }
    return
  }
  
  private _processLeft () {
    if (this.displayControl.cursorColumn === 0) { console.log ('left rejected'); return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow
    const destinationColumn = this.displayControl.cursorColumn - 1
    const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
    const cursorId:string = this.displayControl.getId(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    console.log('for left, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    if (cell.onStack === true) { validMove = false }      //check if id is already explored
    if (validMove) {
      this.displayControl.markOnStack(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
    }
    return
  }

  findShortestPath () {
    console.log('at shortestpath')

  }


}
