import * as React from "react";
import Field from "./field"

class Square extends React.Component {
    renderField(fieldId) {
        return <Field fieldId={fieldId}
                      squareId={this.props.squareId}
                      data={this.props.fields[fieldId]}
                      selectField={() => this.props.selectField(fieldId)}
                      chooseNumber={(chosenValue) => this.props.chooseNumber(fieldId, chosenValue)}
                      active={this.props.active}/>;
    }

    render() {
        return (
            <div className={"square"+(this.props.active.squareId===this.props.squareId ? " active-square":"")}>
                <div className="grid">
                    {this.renderField(0)}
                    {this.renderField(1)}
                    {this.renderField(2)}
                    {this.renderField(3)}
                    {this.renderField(4)}
                    {this.renderField(5)}
                    {this.renderField(6)}
                    {this.renderField(7)}
                    {this.renderField(8)}
                </div>
            </div>
        );
    }
}

export default Square;
