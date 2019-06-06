import React, { Component } from 'react'
import { Jumbotron , Container} from 'react-bootstrap'

//import '../css/Header.css'

class Header extends Component {
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
          <div>
              <Jumbotron  style={styles}>
             <h1 className="display-3">기부하고 메시지를 남기세요!</h1>
                <p className="lead">DONATE ! MESSAGE !</p>
                <p></p>
                </Jumbotron>
         </div>
         
       
            

        );

    }
}


export default Header