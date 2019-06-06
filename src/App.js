import React , {Component } from 'react';
//import logo from './logo.svg';
import { Route, BrowserRouter as Router } from 'react-router-dom';
//import './App.css';
//import 'semantic-ui-css/semantic.min.css'
//import { Container , Header, Table, Rating , Grid } from 'semantic-ui-react'
//import  DonatePage  from './pages/DonatePage'
//import  DonatePageWith  from './pages/DonatePageWith'

//import  About from './pages/About.js'
//import  HeaderMenu from './components/HeaderMenu.js'
// Routes
import Routes from './Routes';

class App extends Component {

 
  render() {
   
    return (
  <div>
       <Router>
          <Routes />
        </Router>
        
     </div>
        )
      }
  }
  
  export default App;

