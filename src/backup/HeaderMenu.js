import React, { Component } from 'react'

import { Segment } from 'semantic-ui-react'

//import '../css/Header.css'

class HeaderMenu extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
      
      }

    }

    componentWillMount() {
        console.log('componentWillMount MainApp');

    }

    componentDidMount(){
        console.log('componentDidMount MainApp');
      
    }
    
    render() {
        
        var styles={
           // "background-color": "#f4511e" ,
            textAlign: "center"
        }
        
        return (
            <Segment placeholder>
            header menu
            </Segment>
         
       
            

        );

    }
}


export default HeaderMenu