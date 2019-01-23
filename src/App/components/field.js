import React, {Component} from 'react';
import ChoiceBox from "./choicebox";

class Field extends Component {
    compareId(ids, compareMap) {
        return compareMap.map(valid =>
            ids.map(needle =>
                valid.includes(needle))
                .filter(v => v).length === 2)
            .filter(v => v).length;
    }

    checkIfActive(square, activeSquare, field, activeField) {
        const column = [[0, 3, 6], [1, 4, 7], [2, 5, 8]];
        const row = [[0, 1, 2], [3, 4, 5], [6, 7, 8]];

        if ((this.compareId([square, activeSquare], row) && this.compareId([field, activeField], row))
            || (this.compareId([square, activeSquare], column) && this.compareId([field, activeField], column)))
            return true;
        else return false;
    }

    render() {
        if (this.props.data.selected && this.props.data.editable) {
            return <ChoiceBox chooseNumber={chosenValue => this.props.chooseNumber(chosenValue)}/>
        } else {
            return (
                    <button
                        className={"field" + (this.props.data.editable ? "" : " non-editable") +
                        (this.checkIfActive(this.props.squareId, this.props.active.squareId,
                            this.props.fieldId, this.props.active.fieldId) ? ` active active-${this.props.fieldId}` : "")}
                        onMouseEnter={() => this.props.selectField()}>
                        <div className={(this.props.data.invalid ? " invalid" : "")}>
                            {this.props.data.value}
                        </div>
                    </button>
            )
        }
    }

}

export default Field;