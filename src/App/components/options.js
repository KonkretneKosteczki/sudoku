import React, {Component} from 'react';
import Cookies from "universal-cookie";

const cookies = new Cookies();

class Options extends Component {
    constructor() {
        super();
        this.state = {
            isHovered: Array(3).fill(false)
        }
    }

    handleEnter(index) {
        let newState = Array(3).fill(false);
        newState[index] = true;
        this.setState({isHovered: newState});
    }

    handleLeave() {
        this.setState({isHovered: Array(3).fill(false)})
    }

    render() {
        return (
            <div>
                {(this.props.showingAlert ? <div className={"alert"}>GAME HAS BEEN SAVED</div> : "")}
                <div className="options">
                    <button title="Home" onClick={() => window.location.href = "/"}
                            className={(this.state.isHovered[0] ? "active" : "")}
                            onMouseEnter={() => this.handleEnter(0)}
                            onMouseLeave={() => this.handleLeave()}><i className={"fas fa-home"}/></button>
                    <button title="Save" onClick={this.props.saveGameState}
                            className={(this.state.isHovered[1] ? "active" : "")}
                            onMouseEnter={() => this.handleEnter(1)}
                            onMouseLeave={() => this.handleLeave()}><i className={"fas fa-save"}/></button>
                    <button title="Replay" onClick={() => {
                                if (window.location.href.includes("continue"))
                                    window.location.href = "/game/" + cookies.get("gameDifficulty");
                                else window.location.reload();
                            }}
                            className={(this.state.isHovered[2] ? "active" : "")}
                            onMouseEnter={() => this.handleEnter(2)}
                            onMouseLeave={() => this.handleLeave()}><i className="fas fa-redo"/></button>
                </div>
            </div>
        );
    }
}

export default Options;