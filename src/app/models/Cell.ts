export class Cell {
    id:         string
    visited:    boolean
    discovered: boolean
    explored:   boolean
    filled:     boolean
    onStack:    boolean
    hasCursor:  boolean
    startCell:  boolean
    finishCell: boolean
    wallUp:     boolean
    wallDown:   boolean
    wallLeft:   boolean
    wallRight:  boolean
}