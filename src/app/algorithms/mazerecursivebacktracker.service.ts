import { Injectable, RootRenderer } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';
import { resolve, delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class MazerecursivebacktrackerService {

  constructor(private displayControl:DisplaycontrolService) { }

  stack: string[]

  onInitStack(){
    this.stack = []
    this.displayControl.markVisited(this.displayControl.cursorRow,this.displayControl.cursorColumn) // mark inital position as visited
  }
  
  asynconFireoffAlgo(){
    
    function delayTimer(){
      return new Promise((resolve) => {
      setTimeout(()=>{ console.log('done waiting');resolve }, 1000)
    })

    async function step() {
      console.log('begin')
      await delayTimer()    //await KW expects a promise to be returned and then waits for it to resolve
      console.log('end')
      }

    //  board must have already been created
//  check for valid start&end position
//  Must have stack initialized
    //this.displayControl.moveCursor (this.displayControl.startRow, this.displayControl.startColumn)
    let keepgoing:boolean = true
//  console.log('this._stepAlgo:',this._stepAlgo)   
//  setTimeout(()=>{console.log('for setTimeout: this._stepAlgo:',this._stepAlgo);this._stepAlgo()},1000)     //need to use arrow funciton to preserve value of this


//  while (keepgoing) {        //comment here    // step algo until maze generation is complete
    let result:string = 'needs to be return value of stepAlgo  or implement finished flag'
      if (result === 'complete') {keepgoing = false}  
//  }                          // and here to implement stepping
  }


}


    _stepAlgo(){                         
    let cursorId:string = this.displayControl.cursorRow.toString() + this.displayControl.cursorColumn.toString(); 
    let chosenDirection:string = 'none'
    while (chosenDirection === 'none') {
      chosenDirection = this._chooseMove(); console.log(chosenDirection)
      if (chosenDirection === 'none') { 
        this._backTrack()                     //on returning from backtrack
        if (this.stack.length === 0) return 'complete' //maze is complete
      }
    }
    const destinationLocation:number[] = this._getDestinationLocation(chosenDirection)
    this.displayControl.knockoutWalls(chosenDirection)
    this.displayControl.moveCursor(destinationLocation[0], destinationLocation[1])
    cursorId = this.displayControl.cursorRow.toString() + this.displayControl.cursorColumn.toString(); 
    this.stack.push(cursorId)                //push destination onto stack
    this.displayControl.markOnStack(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    this.displayControl.redrawBoard()
    console.log('stack:', this.stack)
    console.log('--------------------')
    }
  

  private _chooseMove() {
    let resultDown:boolean = false
    let resultRight:boolean = false
    let resultUp:boolean = false
    let resultLeft:boolean = false
    if (this.displayControl.cursorRow    != 9) {resultDown = this._checkDown()}    // check that moves are within 
    if (this.displayControl.cursorColumn != 9) {resultRight = this._checkRight()}  // the outside boundrary and then
    if (this.displayControl.cursorRow    != 0) {resultUp = this._checkUp()}        // each direction
    if (this.displayControl.cursorColumn != 0) {resultLeft = this._checkLeft()}
    //console.log('right:',resultRight,'down:',resultDown,'left:',resultLeft,'up:',resultUp)
    for (let i=0; i<30; i++){
      let random:number = (Math.floor(Math.random()*4))
      if (random === 0 && resultDown) {return 'down'}
      if (random === 1 && resultRight) {return 'right'}
      if (random === 2 && resultUp) {return 'up'}
      if (random === 3 && resultLeft) {return 'left'}
    }
    return 'none'     // cursor is at a dead end
  }

  private _checkDown(){                                           //FLASH ON CHECKS
    let onStack:boolean = false
    let cell = this.displayControl.board[this.displayControl.cursorRow + 1][this.displayControl.cursorColumn]
    this.stack.forEach(stackItem=>{        //check if id is on stack
      if (stackItem === cell.id) {onStack=true}
    })   
    if ( (cell.visited)||(onStack) ) {return false}
    else return true
  }
  
  private _checkRight(){
    let onStack:boolean = false
    let cell = this.displayControl.board[this.displayControl.cursorRow][this.displayControl.cursorColumn + 1]
    this.stack.forEach(stackItem=>{        //check if id is on stack
      if (stackItem === cell.id) {onStack=true}
    })   
    if ( (cell.visited)||(onStack) ) {return false}
    else return true
  }
  
  
  private _checkLeft(){
    let onStack:boolean = false
    let cell = this.displayControl.board[this.displayControl.cursorRow][this.displayControl.cursorColumn - 1]
    this.stack.forEach(stackItem=>{        //check if id is on stack
      if (stackItem === cell.id) {onStack=true}
    })   
    if ( (cell.visited)||(onStack) ) {return false}
    else return true
  }

  private _checkUp(){
    let onStack:boolean = false
    let cell = this.displayControl.board[this.displayControl.cursorRow - 1][this.displayControl.cursorColumn]
    this.stack.forEach(item=>{        //check if id is on stack
      if (item === cell.id) {onStack=true}
    })   
    if ( (cell.visited)||(onStack) ) {return false}
    else return true
  }

  private _getDestinationLocation(direction:string) {
    let destination:number[] = []  
    if (direction==='down') { 
      destination[0] = this.displayControl.cursorRow  + 1
      destination[1] = this.displayControl.cursorColumn
    }
    if (direction==='up') { 
      destination[0] = this.displayControl.cursorRow  - 1
      destination[1] = this.displayControl.cursorColumn
    }
    if (direction==='left') { 
      destination[0] = this.displayControl.cursorRow
      destination[1] = this.displayControl.cursorColumn - 1
    }
    if (direction==='right') { 
      destination[0] = this.displayControl.cursorRow
      destination[1] = this.displayControl.cursorColumn +1
    }
    return destination
  }

  private _backTrack(){
    console.log ('at _backTrack')
    this.displayControl.markVisited(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    const poppedLocation:number[] = this._popStack()
    if (this.stack.length === 0) {console.log('mazecomplete'); return}       //maze is complete
    //this.displayControl.cursorColumn = Number(poppedRowColumn[1])     
    this.displayControl.moveCursor(poppedLocation[0],poppedLocation[1])   //set master cursor position to stackpop position
  }

  private _popStack () {
    const poppedId:string = this.stack.pop()
    const poppedLocation:number[] = this.displayControl.getRowColumn(poppedId)
    //this.displayControl.board[poppedRowColumn[0]][poppedRowColumn[1]].onStack = false  //update display state
    //document.getElementById(poppedId).classList.remove('on-stack') //update display element 
    this.displayControl.markOffStack(poppedLocation[0],poppedLocation[1])
    return poppedLocation
  }

  pushStack (id:string) {
    this.stack.push(id)
    const poppedRowColumn:number[] = this.displayControl.getRowColumn(id)
    //this.displayControl.board[poppedRowColumn[0]][poppedRowColumn[1]].onStack = true  //update display state
    this.displayControl.markOnStack(poppedRowColumn[0],poppedRowColumn[1])
  }

}
