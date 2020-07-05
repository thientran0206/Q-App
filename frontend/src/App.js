import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Questions from './Questions/Questions';
import Question from './Question/Question';
import NewQuestion from './NewQuestion/NewQuestion';
import Login from './Auth/Login';
import Signup from './Auth/Signup';
class App extends Component{
  render(){
    return (
      <div>
        <NavBar/>
        <Route exact path='/' component={Questions}/>
        <Route exact path='/question/:questionId' component={Question}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
      </div>
    );
  }
}

export default App;
