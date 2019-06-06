import React , {Component } from 'react';
import logo from './logo.svg';
import { Route, BrowserRouter as Router } from 'react-router-dom';
//import './App.css';
import 'semantic-ui-css/semantic.min.css'
import { Container , Header, Table, Rating , Grid } from 'semantic-ui-react'
import  DonatePage  from './pages/DonatePage'
import  About from './pages/About.js'
import  HeaderMenu from './components/HeaderMenu.js'


class Appbackup extends Component {

 
  render() {
   
    return (
  
       <Grid celled='internally'>
          <Grid.Row><Grid.Column><HeaderMenu/></Grid.Column>
        </Grid.Row>
        <Grid.Row>
        <Grid.Column width={2}>advvvvvvvvvvvvvvvvvvvv</Grid.Column>
          <Grid.Column width={12}>
        <Router>
          <Route exact path="/" component={DonatePage}/>
          <Route exact path="/About" component={About}/>
          </Router>
          </Grid.Column>
          <Grid.Column width={2}>advvvvvvvvvvvvvvvvvvvv</Grid.Column>
          </Grid.Row>
       
         <Grid.Row>
            <Grid.Column>fotterrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr</Grid.Column>
         </Grid.Row>
         </Grid>
        )
      }
  }
  
  export default Appbackup;

