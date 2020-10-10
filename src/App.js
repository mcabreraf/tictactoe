import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Game from './components/gameComponent';

function App(){
    return(
        <Router>
            <div className="container"></div>
            <Route path="/games" exact component={Game} />
            <Redirect to="/games" />
        </Router>
    );
}

export default App;