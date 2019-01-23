import React, {Component} from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Menu from './pages/Menu';

class App extends Component {
    render() {
        const App = () => (
            <div>
                {/*navigation component*/}
                <Switch>
                    <Route exact path='/game/:difficulty' component={Home}/>
                    <Route path='/' component={Menu}/>
                </Switch>
            </div>
        );
        return (
            <Switch>
                <App/>
            </Switch>
        );
    }
}

export default App;
