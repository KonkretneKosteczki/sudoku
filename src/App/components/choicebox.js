import React, {Component} from 'react';

class Choicebox extends Component {
    createChoices = () => {
        return Array(9).fill(null).map((_, i)=> <button key={i} value={i} onClick={()=>this.props.chooseNumber(i+1)} className="cell choice-element">{i+1}</button>);
    };
    render() {
        return (<div className="choice-box grid">{this.createChoices()}</div>);
    }
}

export default Choicebox;