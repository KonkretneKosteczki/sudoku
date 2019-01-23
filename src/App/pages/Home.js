import React, {Component} from 'react';
import Board from "../components/board";
import Options from "../components/options";
import Sudoku from "../sudokus";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

class Home extends Component {
    constructor(props) {
        super(props);
        if (this.props.match.params.difficulty === "continue") {
            this.state = {
                showingAlert: false,
                gameSaveData: Array
                    .apply(null, {length: 9})
                    .map(Number.call, Number)
                    .map(index => cookies.get(`gameSaveData${index}`))
                    .map(cookie => this.decryptCookie(cookie))
            }
            // console.log(this.state.gameSaveData[0]);
            // console.log(this.decryptCookie(this.encryptCookie(this.state.gameSaveData[0])));
        } else {
            this.state = {
                showingAlert: false,
                sudoku: new Sudoku().generate(this.props.match.params.difficulty)
            };
        }
        this.handleChange = this.handleChange.bind(this);
        this.saveGameState = this.saveGameState.bind(this);
    }

    encryptCookie(data) {
        return data.fields.map(field => (JSON.parse(JSON.stringify({
            e: field.editable ? 1 : undefined,
            i: field.invalid ? 1 : undefined,
            v: field.value
        }))))
    }

    decryptCookie(data) {
        // console.log(data, typeof data);
        // console.log({fields: data.map(field => ({
        //     editable: !!field.e,
        //     selected: false,
        //     invalid: !!field.i,
        //     value: field.v
        // }))})
        return {fields: data.map(field => ({
            editable: !!field.e,
            selected: false,
            invalid: !!field.i,
            value: field.v
        }))}
    }

    saveGameState() {
        let i = 0;
        this.state.currentSave.squares.forEach(square => {
            square.fields.forEach(field => field.selected = false);
            cookies.set(`gameSaveData${i++}`, this.encryptCookie(square), {path: '/'});
            // cookies.set(`gameSaveData${i++}`, square, {path: '/'});
        });
        cookies.set("gameDifficulty", this.props.match.params.difficulty, {path: '/'});
        this.setState({showingAlert: true}, () => {
            setTimeout(() => {
                this.setState({
                    showingAlert: false
                });
            }, 2000);

        });
    }

    handleChange(state) {
        this.setState({currentSave: state});
    }

    render() {
        return (
            <div className="App">
                <Options showingAlert={this.state.showingAlert} saveGameState={this.saveGameState}/>
                {(this.state.gameSaveData ?
                        <Board changeCallback={this.handleChange} gameSaveData={this.state.gameSaveData}/> :
                        <Board changeCallback={this.handleChange} sudoku={this.state.sudoku.puzzle}/>
                )}
            </div>
        );
    }
}

export default Home;