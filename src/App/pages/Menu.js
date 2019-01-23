import React, {Component} from 'react';
import {Link} from "react-router-dom"
import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            continuePossible: cookies.get("gameSaveData0"),
            continueActivate: false,
            easyActive: false,
            normalActive: false,
            highActive: false,
            helpActive: false
        }
    }

    updateState({easyActive = false, normalActive = false, highActive = false, helpActive = false, continueActivate=false}) {
        this.setState({easyActive, normalActive, highActive, helpActive, continueActivate})
    }

    render() {
        return (
            <div className="App menu-wrapper">
                <div className={"menu"}>
                    <div>
                        <h1 className="logo">SUDOKU</h1>
                        <h3 className="deluxe">Deluxe</h3>
                    </div>
                    <br/>
                    {(this.state.continuePossible ?
                        <Link className={"menu-item"} to={'/game/continue'}>
                            <button className={this.state.continueActivate ? "active" : ""}
                                    onMouseOver={() => this.updateState({continueActivate: true})}>CONTINUE
                            </button>
                        </Link>:"")}
                    <Link className={"menu-item"} to={'/game/easy'}>
                        <button className={this.state.easyActive ? "active" : ""}
                                onMouseOver={() => this.updateState({easyActive: true})}>EASY
                        </button>
                    </Link>
                    <Link className={"menu-item"} to={'/game/normal'}>
                        <button className={this.state.normalActive ? "active" : ""}
                                onMouseOver={() => this.updateState({normalActive: true})}>NORMAL
                        </button>
                    </Link>
                    <Link className={"menu-item"} to={'/game/high'}>
                        <button className={this.state.highActive ? "active" : ""}
                                onMouseOver={() => this.updateState({highActive: true})}>HIGH
                        </button>
                    </Link>
                    {/*<Link className={"menu-item"} to={'/help'}>*/}
                        {/*<button className={this.state.helpActive ? "active" : ""}*/}
                                {/*onMouseOver={() => this.updateState({helpActive: true})}>HELP*/}
                        {/*</button>*/}
                    {/*</Link>*/}
                </div>
            </div>
        );
    }
}

export default Menu;