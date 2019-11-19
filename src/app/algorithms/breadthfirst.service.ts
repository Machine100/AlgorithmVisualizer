import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class BreadthfirstService {

constructor(private displayControl:DisplaycontrolService) { }

// visitedStack: string[]          // ids of visited nodes      :      data now tracked on the board.
sourceStack: string[]           // ids of nodes from where algo found the node
stateStack: string[]            // state of the node
traversalStack: string[]        // main output of the search algorithm
stackpointer: number            // points to an index on the traversalStack

init() {
  console.log('at init()')
  this.visitedStack = []
  this.sourceStack = []
  this.stateStack = []
  this.traversalStack = []
  this.stackpointer = 0
                                // set first entry in traversalStack to start position
}

runAlgo() {
  this.stepAlgo()
  }

stepAlgo() {
  console.log('at stepAlgo()')
                                             
    const unvisitedNeighbors: boolean[] = this.findUnvisitedNeighbors() 
                                                // put all unvisited neighbors onto traversalStack
                                                // mark this node as visited on the board
                                                // if traversalStack is empty, traversal is complete
                                                // move stack pointer to next stack location
}

findUnvisitedNeighbors() {
    let resultDown:boolean = false
    let resultRight:boolean = false
    let resultUp:boolean = false
    let resultLeft:boolean = false
    resultDown = this._checkDown()           // validate each direction
    resultRight = this._checkRight()
    resultUp = this._checkUp()      
    resultLeft = this._checkLeft()
    const resultArray:boolean[] = [resultDown, resultRight, resultUp, resultLeft]
    return resultArray
}

  private _checkDown(){
    let validMove:boolean = true
    let cell = this.displayControl.board[this.displayControl.cursorRow + 1][this.displayControl.cursorColumn]
    if (this.displayControl.cursorRow = 9) { validMove = false } //check for board boundary
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    return validMove 
  }
  
  private _checkRight(){
    let validMove:boolean = true
    let cell = this.displayControl.board[this.displayControl.cursorRow][this.displayControl.cursorColumn + 1]
    if (this.displayControl.cursorColumn = 9) { validMove = false } //check for board boundary
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    return validMove 
  }

  private _checkUp(){
    let validMove:boolean = true
    let cell = this.displayControl.board[this.displayControl.cursorRow - 1][this.displayControl.cursorColumn]
    if (this.displayControl.cursorRow = 0) { validMove = false } //check for board boundary
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    return validMove 
  }
  
  private _checkLeft(){
    let validMove:boolean = true
    let cell = this.displayControl.board[this.displayControl.cursorRow][this.displayControl.cursorColumn - 1]
    if (this.displayControl.cursorColumn = 0) { validMove = false } //check for board boundary
    if (cell.visited === true) { validMove = false }      //check if id is already visited
    return validMove 
  }

}
