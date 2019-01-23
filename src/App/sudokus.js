import { SudokuSolver } from '@jlguenego/sudoku-generator';
import _ from "lodash";

class sudokus {
    generate(difficulty){
        const difficulties = {
            "easy":35,
            "normal":45,
            "high":55,
        };
        const solution = SudokuSolver.generate();
        const puzzle = SudokuSolver.carve(solution, difficulties[difficulty] || 0);
        return {solution: this.remapSudoku(solution), puzzle: this.remapSudoku(puzzle)};
    }
    remapSudoku(grid){
        let squares=Array(9).fill([]);
        grid.forEach((row, rowId)=>{
            _.chunk(row, 3).forEach((el, elId)=>{
                el=el.map(value => value===0? null : value);
                squares[Math.floor(rowId/3)*3+elId]=_.concat(squares[Math.floor(rowId/3)*3+elId], el);
            })
        });
        return squares;
    }
}

export default sudokus;