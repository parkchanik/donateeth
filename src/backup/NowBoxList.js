import React, { Component } from 'react'
//import axios from 'axios';
//import { withStyles } from '@material-ui/core/styles';
//import Button from '@material-ui/core/Button';
import { Jumbotron , Grid , Row , Col , Label , Button} from 'react-bootstrap'

//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
  const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
     
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
  });

class NowBoxList extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        messagelistdata : []       
      }

      this.handleSubmit = this.handleSubmit.bind(this);
      this.takeBox = this.takeBox.bind(this);
    }

    
    componentWillMount() {
          
    }
    
    componentDidMount(){
    
        this.getSendBoxList();
    }

    
    getSendBoxList() {
        console.log('getSendBoxList');
            //let getrank = () => {
                /*
                //axios.get('/sendaboxlist')
                axios.get('http://localhost:3030/api/v1/sendaboxlist')
                .then (response => {
                    console.log(response.data.result);
                    console.log('------end response.data');
                    //const posts = response.data.map(obj => obj.data);
                    //const data = response.data;  
                    //const vals = response.data.result;
                    const vals = JSON.stringify(response.data.result);
                    console.log(JSON.stringify(vals))
                    this.setState( {messagelistdata : JSON.parse(vals)});
                    //console.log(this.state.rankdata); 
                    
                })
                .catch(function (e) {
                    console.log(e);
                });
*/
    }


    takeBox(boxidx) {
        console.log(boxidx);
        /*
        var config = {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
        
            },
       };*/

     
        var body = {
       
                boxidx: boxidx  , 
                takeaddress: this.props.address  
        };
        /*
        let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
        };
        console.log('takebox');
            //let getrank = () => {
                axios.post('http://localhost:3030/api/v1/takebox' , body , axiosConfig)
                .then (response => {
                    console.log(response.data);
                    console.log('------end response.data');
                    //const posts = response.data.map(obj => obj.data);
                    //const data = response.data;  
                    //const vals = response.data;
                   // this.setState( {rankdata : JSON.parse(vals)});
                    //console.log(this.state.rankdata); 
                    
                })
                .catch(function (e) {
                    console.log(e);
                });

            */

    }

  
   handleSubmit(boxidx) {
    // e.preventDefault();
    console.log(boxidx);
  
    this.takeBox(boxidx);
            
 };
 
  
    render() {
      
 
        //const { classes } = this.props;
        // () => this.handleSubmit(this.boxmsg) = this.handleClick.bind(this.boxmsg, id)

        var messagelist =
        (
           
            <Row className="show-grid">
                {this.state.messagelistdata.map(item =>
                         <Col sm={4} md={4}>
                       <h4>SENDER : { item.Sender_address } </h4>
                       <h4>WEI IN MESSAGE : { item.Send_wei } </h4>
                        <h4> MESSAGE : { item.Boxmsg } </h4>
                        <Button variant="outlined" color="primary" onClick={() => this.handleSubmit(item.Boxidx)} > 
                          확인
                      </Button>

                        </Col>
                 
                    )}
                </Row>
            
         
        );
                            
               
        return (
            <div >
                <div  style={{ textAlign:"center"}}>
                        <h4>GET ETHEREUM WITH MESSAGE</h4>
                    </div>

                <h4>key  {this.props.uniquekey} </h4>

                {messagelist}               
                    
            </div>
          

        );

    }

    /*

     var messagelist = this.state.messagelistdata.map(item =>
               
                        <div  style={{ border: "1px solid gold", float: "left", width: "30%", padding:"10px"}}>
                        SENDER : { item.sender_address } ETH IN BOX { item.send_wei } 
                        <h4> { item.boxmsg } </h4>
                        <Button variant="outlined" color="primary" onClick={() => this.handleSubmit(item.boxidx)} > 
                          Primary
                      </Button>
                            <br/><br/>
                            </div>
                          
                        
                      )
    */
/*

    render() {
        return (
            <ul>
                {this.state.rankdata.map(function(item , index) {
                return (
                  
                    <div>
                    { item.boxidx } 
                   { item.boxmsg } 
                     { item.send_wei } 
                   { index } 
                    </div>
                    )
            })
            
        }
          </ul>
            

        );

    }
    */
}
//export default withStyles(styles)(NowBoxList)
export default NowBoxList