import { Injectable } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';

@Injectable({
  providedIn: 'root'
})
export class MazerecursivebacktrackerService {

  constructor(private displayControl:DisplaycontrolService) { }

  stack: string[]

  onFireoffAlgo(){
//  board must have already been created
//  check for valid start&end position
    this.displayControl.cursorRow = this.displayControl.startRow            //NOT A SETTER
    this.displayControl.cursorColumn = this.displayControl.startColumn      //NOT A SETTER
    let keepgoing:boolean = true
    while (keepgoing) {                    // step algo until maze generation is complete
      let result:string = this._stepAlgo()
      if (result === 'complete') {keepgoing = false}  
    }
  }

  private _stepAlgo() {
    let chosenDirection:string = 'none'
    while (chosenDirection === 'none') {
      chosenDirection = this._chooseMove(); console.log(chosenDirection)
      if (chosenDirection === 'none') { 
        this._backTrack()                     
        if (this.stack.length === 0) return 'complete' //After backtrack, maze is complete if stack is empty
      }
    }  
    this.knockoutWalls(chosenDirection)
    this.moveCursor(chosenDirection)
    this.stack.push(cursorId)                //push current position onto stack
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
    let result = this.displayControl.board[this.displayControl.cursorRow + 1][this.displayControl.cursorColumn]
    this.stack.forEach(item=>{        //check if id is on stack
      if (item === result.id) {onStack=true}
    })   
    if ( (result.visited)||(onStack) ) return false
    else return true
  }
  
  private _checkRight(){
    let onStack:boolean = false
    let result = this.displayControl.board[this.displayControl.cursorRow][this.displayControl.cursorColumn + 1]
    this.stack.forEach(item=>{        //check if id is on stack
      if (item === result.id) {onStack=true}
    })   
    if ( (result.visited)||(onStack) ) {return false}
    else return true
  }
  
  private _checkLeft(){
    let onStack:boolean = false
    let result = this.displayControl.board[this.displayControl.cursorRow][this.displayControl.cursorColumn - 1]
    this.stack.forEach(item=>{        //check if id is on stack
      if (item === result.id) {onStack=true}
    })   
    if ( (result.visited)||(onStack) ) {return false}
    else return true
  }

  private _checkUp(){
    let onStack:boolean = false
    let result = this.displayControl.board[this.displayControl.cursorRow - 1][this.displayControl.cursorColumn]
    this.stack.forEach(item=>{        //check if id is on stack
      if (item === result.id) {onStack=true}
    })   
    if ( (result.visited)||(onStack) ) {return false}
    else return true
  }

  private _backTrack(){
    this.displayControl.markVisited(this.displayControl.cursorRow, this.displayControl.cursorColumn)
    //let result:string = this.stack.pop() ; console.log ('result:', result) //pop stack
    let result:string = this.popStack()
    if (this.stack.length === 0) {console.log('mazecomplete'); return}       //maze is complete
    let poppedRowColumn:string[] = result.split('') ; console.log('poppedRowColumn',poppedRowColumn)
    this.displayControl.cursorRow = Number(poppedRowColumn[0])            //set master cursor position to stackpop position
    this.displayControl.cursorColumn = Number(poppedRowColumn[1])     
  }

    popStack () {
    const poppedId:string = this.stack.pop()
    const poppedRowColumn:number[] = this.displayControl.getRowColumn(poppedId)
    this.displayControl.board[poppedRowColumn[0]][poppedRowColumn[1]].onStack = false  //update display state
    document.getElementById(poppedId).classList.remove('on-stack') //update display element 
    return poppedId
  }

  pushStack (id:string) {
    this.stack.push(id)
    const poppedRowColumn:number[] = this.displayControl.getRowColumn(id)
    this.displayControl.board[poppedRowColumn[0]][poppedRowColumn[1]].onStack = true  //update display state
    document.getElementById(id).classList.add('on-stack') //update display element 
  }
}
