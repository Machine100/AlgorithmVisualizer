import { Component, OnInit } from '@angular/core';
import { DisplaycontrolService } from 'src/app/displaycontrol.service';
import { BreadthfirstService } from 'src/app/algorithms/breadthfirst.service';
import { MazerecursivebacktrackerService } from 'src/app/algorithms/mazerecursivebacktracker.service';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss']
})
export class ButtonsComponent implements OnInit {

  constructor(
    private displayControl:DisplaycontrolService,
    private breadthfirst:BreadthfirstService,
    private mazeRecursiveBacktracker: MazerecursivebacktrackerService) {}

  ngOnInit() {
    this.displayControl.initBoard()
  }

  onInit() {
    console.log('At buttons onInit()')
    this.displayControl.redrawBoard()
  //  this.displayControl.fillCell(1, 1)
  }

  onStartStop() {
    this.displayControl.markStart(2,2)
    this.displayControl.markFinish(6,6)
  }

  onInitBreadth() {
    this.breadthfirst.init()
  }
  
  onStepBreadth() {
    this.breadthfirst.stepAlgo()
  }

  onStartMazeRecursiveBacktracker () {
    this.mazeRecursiveBacktracker.onFireoffAlgo()
  }

  onInitStack(){
    this.mazeRecursiveBacktracker.onInitStack()
  }
}
