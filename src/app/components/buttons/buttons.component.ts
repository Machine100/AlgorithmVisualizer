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
    console.log('I been clicked')
    this.displayControl.redrawBoard()
    this.displayControl.fillCell(1, 1)
  }

  onStartStop() {
    this.displayControl.markStart(2,2)
    this.displayControl.markFinish(6,6)
  }

  onFillAll() {
    this.breadthfirst.fillAll()
  }
  
  onClearAll() {
    this.breadthfirst.clearAll()
  }

  onStartBreadthFirst() {
    this.breadthfirst.runAlgo()
  }

  onStartMazeRecursiveBacktracker () {
    this.mazeRecursiveBacktracker.onFireoffAlgo()
  }
}
