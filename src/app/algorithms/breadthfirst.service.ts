import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class BreadthfirstService {

constructor(private displayControl:DisplaycontrolService) { }

visitedStack: string[]          // ids of visited nodes
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
}

runAlgo() {
  this.stepAlgo()
  }

stepAlgo() {
  console.log('at stepAlgo()')
              this.findNeighbors()              // find all neighbors of stack pointer on board at displayControl
                                                // put all unvisited neighbors onto traversalStack
                                                // mark this node as visited in visitedStack
                                                // if traversalStack is empty, traversal is complete
                                                // move stack pointer to next stack location
}

findNeighbors() {
    let resultDown:boolean = false
    let resultRight:boolean = false
    let resultUp:boolean = false
    let resultLeft:boolean = false
    if (this.displayControl.cursorRow    != 9) {resultDown = this._checkDown()}    // check that moves are within 
    if (this.displayControl.cursorColumn != 9) {resultRight = this._checkRight()}  // the outside boundrary and then
    if (this.displayControl.cursorRow    != 0) {resultUp = this._checkUp()}        // each direction
    if (this.displayControl.cursorColumn != 0) {resultLeft = this._checkLeft()
}
  private _checkDown(){
    let onStack:boolean = false
    let cell = this.displayControl.board[this.displayControl.cursorRow + 1][this.displayControl.cursorColumn]
    this.stack.forEach(stackItem=>{        //check if id is on stack
      if (stackItem === cell.id) {onStack=true}
    })   
    if ( (cell.visited)||(onStack) ) {return false}
    else return true
  }

}
