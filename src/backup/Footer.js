import React, { Component } from 'react'
import { Jumbotron } from 'react-bootstrap'

class Footer extends Component {
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
            
            textAlign: "center"
        }

        return (
          
                    
             <Jumbotron style={styles}>
         
            <div class="jumbotron text-center">
            <p></p>
            </div>
            </Jumbotron>
                

        );

    }
}


export default Footer
