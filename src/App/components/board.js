import React from "react";
import Square from "./square";

class Board extends React.Component {
    changeActiveOnKey(key, active) {
        if (key === "ArrowDown") {
            this.selectField((active.squareId + Math.floor((active.fieldId + 3) / 9) * 3) % 9, (active.fieldId + 3) % 9);
        } else if (key === "ArrowUp") {
            this.selectField((active.squareId + Math.floor((active.fieldId - 3) / 9) * 3 + 9) % 9, (active.fieldId + 6) % 9);
        } else if (key === "ArrowRight") {
            const nextSquare = active.fieldId % 3 < (active.fieldId + 1) % 3 ? 0 : 1;
            this.selectField(
                Math.floor((active.squareId) / 3) * 3 + (active.squareId + nextSquare) % 3,
                Math.floor((active.fieldId) / 3) * 3 + (active.fieldId + 1) % 3
            );
        } else if (key === "ArrowLeft") {
            const previousSquare = active.fieldId % 3 < (active.fieldId + 2) % 3 ? -1 : 0;
            this.selectField(
                Math.floor((active.squareId) / 3) * 3 + (active.squareId + 3 + previousSquare) % 3,
                Math.floor((active.fieldId) / 3) * 3 + (active.fieldId + 2) % 3);
        }
    }

    getLines(map,squares){
        let output=[];
        // alert(JSON.stringify(map));
        map.forEach(i=>{
            map.forEach(j=>{
                let line=[];
                let ids=[];
                i.forEach(squareId=>{
                    j.forEach(fieldId=>{
                        line.push(squares[squareId].fields[fieldId]);
                        ids.push({squareId, fieldId})
                    })
                });
                output.push({data: line, ids});
            })
        });
        return output;
    }

    getRows(squares){
        const rowMap = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];
        return this.getLines(rowMap,squares);
    }
    getColumns(squares){
        const columnMap = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        return this.getLines(columnMap,squares);
    }

    checkValid(){
        const comparator=Array(9).fill(null).map((_,id)=>id+1);
        function getAllIndexes(arr, val) {
            let indexes = [];
            arr.forEach((element,index)=>{
                if (element.value === val) indexes.push(index);
            });
            return indexes;
        }
        const squares = this.state.squares.slice().map(square=>{
            square.fields.forEach(field => {field.invalid=false});//reset
            comparator.forEach(value=>{
                const inSquareIds = getAllIndexes(square.fields,value);
                if (inSquareIds.length>1){
                    inSquareIds.forEach(i=>{
                        square.fields[i].invalid=true;
                    });
                }
            });
            return square;
        });
        const rowsd = this.getRows(squares);
        const columnsd = this.getColumns(squares);
        comparator.forEach(value=>{
            columnsd.forEach(columns=>{
                const inColumnIds = getAllIndexes(columns.data, value);
                if (inColumnIds.length>1){
                    inColumnIds.forEach(i=>{
                        squares[columns.ids[i].squareId].fields[columns.ids[i].fieldId].invalid=true;
                    });
                }
            });
            rowsd.forEach(rows=>{
                const inRowIds = getAllIndexes(rows.data, value);
                if (inRowIds.length>1){
                    inRowIds.forEach(i=>{
                        squares[rows.ids[i].squareId].fields[rows.ids[i].fieldId].invalid=true;
                    });
                }
            });
        });

        this.setState({squares: squares});
        this.props.changeCallback(this.state);
    }

    componentDidMount() {
        document.addEventListener("keydown", (event) => {
            if (this.active.hasOwnProperty("squareId")) {
                if (event.key >= '1' && event.key <= '9') {
                    this.chooseNumber(this.active.squareId, this.active.fieldId, parseInt(event.key, 10));
                } else if (event.key === 'Backspace' || event.key === 'Delete' || event.key === '0' || event.key === ' ') {
                    this.chooseNumber(this.active.squareId, this.active.fieldId, null);
                } else {
                    this.changeActiveOnKey(event.key, this.active);
                }
            } else {
                this.changeActiveOnKey(event.key, this.lastActive);
            }
        }, false);
    }

    constructor(props) {
        super(props);
        this.active = {};
        this.lastActive = {squareId: 4, fieldId: 4};
        this.state = {
            squares: this.props.gameSaveData || this.props.sudoku
                .map(square => ({
                    fields: square.map(field => ({
                        editable: field === null,
                        selected: false,
                        invalid: false,
                        value: field
                    }))
                })),
        };
        this.props.changeCallback(this.state);
    }

    chooseNumber(squareId, fieldId, chosenValue) {
        const squares = this.state.squares.slice();
        if (squares[squareId].fields[fieldId].editable){
            squares[squareId].fields[fieldId] = {
                selected: false,
                value: chosenValue,
                editable: true,
                invalid:false
            };
            this.lastActive = this.active;
            this.active = {};
        }
        this.setState({squares: squares},this.checkValid);
    }

    selectField(squareId, fieldId) {
        this.active = {squareId, fieldId};
        const squares = this.state.squares.slice().map((square, sId) => ({
            fields: square.fields.map((field, fId) => {
                if (squareId === sId && fieldId === fId) field.selected=true;
                else field.selected=false;
                return field;
            })
        }));
        this.setState({squares: squares});
    }

    createBoard = () => {
        return Array(9)
            .fill(null)
            .map((_, squareId) =>
                <Square key={squareId}
                        squareId={squareId}
                        fields={this.state.squares[squareId].fields}
                        selectField={(fieldId) => this.selectField(squareId, fieldId)}
                        chooseNumber={(fieldId, chosenValue) => this.chooseNumber(squareId, fieldId, chosenValue)}
                        active={this.active}/>);
    };

    render() {
        return (
            <div className={"game"}>
                <div className="game-board grid">
                    {this.createBoard()}
                </div>
            </div>
        );
    }
}

export default Board;