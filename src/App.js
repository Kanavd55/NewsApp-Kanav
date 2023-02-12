import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

export class App extends Component {
    state={
      progress:10,
      apikey:'c562d548a8bd4716946408283b80acf3'
    }

    
     

  setProgress=(progressk)=>{
    this.setState({
      progress:progressk
    })
  }
  render() {
    return (
      <div>
        <Router>
        <NavBar/>
        <LoadingBar
        color='#f11946'
        progress={this.state.progress}
        height={3}
      />
        <Switch>
        <Route exact path="/">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="general" pageSize={5} country="in" category="general"/>
        </Route>
        <Route exact path="/business">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="business" pageSize={5} country="in" category="business"/>
        </Route>
        <Route exact path="/entertainment">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="entertainment" pageSize={5} country="in" category="entertainment"/>
        </Route>
        <Route exact path="/health">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="health" pageSize={5} country="in" category="health"/>
        </Route>
        <Route exact path="/sports">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="sports" pageSize={5} country="in" category="sports"/>
        </Route>
        <Route exact path="/science">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="science" pageSize={5} country="in" category="science"/>
        </Route>
        <Route exact path="/technology">
            <News apikey={this.state.apikey} setProgress={this.setProgress} key="technology" pageSize={5} country="in" category="technology"/>
        </Route>
        </Switch>
        </Router>
      </div>
    )
  }
}

export default App

