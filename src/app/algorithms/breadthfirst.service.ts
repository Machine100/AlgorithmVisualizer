import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class BreadthfirstService {

constructor(private displayControl:DisplaycontrolService) { }

algoFinished: boolean
sourceStack: string[]           // ids of nodes from where algo found the node
traversalStack: string[]        // main output of the search algorithm
//whoFoundMe: string[]            // a reference to the node id that found this node
stackPointer: number            // points to an index on the traversalStack

init() {
  console.log('at init()')
  this.algoFinished = false
  this.sourceStack = []
  this.traversalStack = []
  this.stackPointer = 0
  this.displayControl.cursorRow = this.displayControl.startRow
  this.displayControl.cursorColumn = this.displayControl.startColumn
  this.traversalStack[0] = this.displayControl.getId(this.displayControl.startRow,this.displayControl.startColumn)                            // set first entry in traversalStack to start position
}

async runAlgo() {
  //this.algoFinished = false
  while(!this.algoFinished){
    this.stepAlgo()
    await this._delayTimer()
  }
console.log ('sourceStack:', this.sourceStack)
this.findShortestPath()
}

private _delayTimer () {
  return new Promise((resolve)=>{
    setTimeout( ()=> {
      console.log('delayTimer Resolved')
      resolve()
    },0)
  })
}

stepAlgo() {
  console.log('at stepAlgo()')
  console.log(this.traversalStack)
  console.log('stackLength', this.traversalStack.length)
  console.log('stackPointer:', this.stackPointer)
  this.exploreNeighbors()   //visit all neighbors and place unexplored ones onto traversalStack
  if (this.stackPointer +1 === this.traversalStack.length) {           //
    console.log ('algo complete')
    this.algoFinished = true
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
    this.displayControl.markExplored(this.displayControl.cursorRow,this.displayControl.cursorColumn)
}

  private _processDown () {
    if (this.displayControl.cursorRow === 19) { console.log ('down rejected'); return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow + 1
    const destinationColumn = this.displayControl.cursorColumn
    const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
    const cursorId:string = this.displayControl.getId(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    console.log('for down, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    if (cell.discovered === true) { validMove = false }      //check if destination node is already discovered
    if (validMove) {                                      //if not, discover it.
      this.displayControl.markDiscovered(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
      this.displayControl.markSource(destinationRow, destinationColumn)
    }
    return
  }
  
  private _processRight () {
    if (this.displayControl.cursorColumn === 19) { console.log ('right rejected'); return } //check for board boundary
    let validMove:boolean = true
    const destinationRow = this.displayControl.cursorRow
    const destinationColumn = this.displayControl.cursorColumn + 1
    const destinationId:string = this.displayControl.getId(destinationRow,destinationColumn)
    const cursorId:string = this.displayControl.getId(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    console.log('for Right, checing destination:',destinationRow,destinationColumn)
    let cell = this.displayControl.board[destinationRow][destinationColumn]
    if (cell.discovered === true) { validMove = false }      //check if destination node already discovered
    if (validMove) {                                      //if not, discover it
      this.displayControl.markDiscovered(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
      this.displayControl.markSource(destinationRow, destinationColumn)
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
    if (cell.discovered === true) { validMove = false }   //
    if (validMove) {                                   //
      this.displayControl.markDiscovered(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
      this.displayControl.markSource(destinationRow, destinationColumn)
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
    if (cell.discovered === true) { validMove = false }      //check if id is already discovered
    if (validMove) {
      this.displayControl.markDiscovered(destinationRow, destinationColumn)
      this.traversalStack.push(destinationId)
      this.sourceStack.push(cursorId)
      this.displayControl.markSource(destinationRow, destinationColumn)
    }
    return
  }

  findShortestPath () {               // change to private
    console.log('at shortestpath')
    let keepGoing:boolean = true
    let startId:string = '2_2'
    let finishId:string = '17_17'
    let startIndex:number = this._findIndex(startId)
    let finishIndex:number = this._findIndex(finishId)
    let pointer:number = finishIndex
    console.log('startIndex, finishIndex:', startIndex, finishIndex)
    while (keepGoing) {
      let foundById:string = this.sourceStack[pointer]  
      let foundByIndex:number = this._findIndex(foundById)
      console.log ('foundByIndex:', foundByIndex)
      //mark path node on display
      pointer = foundByIndex
      console.log('pointer:', pointer)
      //if (foundByIndex === startIndex) { keepGoing = false}
      keepGoing = false
    }

  }

  private _findIndex (id:string) {
    let i:number
    for (i = 0; i <= this.traversalStack.length; i++) {
      console.log ('looking for node id:', id, 'id at traversal[', i, ']. Value here is: ', this.traversalStack[i])
      if (this.traversalStack[i] === id) {
        console.log('id found at stack location: ', i)
        return i
      }
    console.log('id not found')

    }
  }


}
