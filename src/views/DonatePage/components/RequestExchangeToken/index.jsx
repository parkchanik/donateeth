import React from 'react';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    input1: {
      height: 1,

    },
    input2: {
      height: 200,
      fontSize: "3em"
    }
  };

class RequestExchangeToken extends React.Component  {
    constructor(props) {
        super(props)
       this.state = {token : 0} 
    }

     
     handleChange = (e) => { 
        console.log(e)
        console.log(e.target.value)
        console.log(e.target.name)
         this.setState({ [e.target.name]: e.target.value }) 
    } 
    handleChangeEther = e => { 
        console.log(e)
        console.log(e.target.value)
        this.setState({ether : e.target.value})
         // this.setState({ [e.target.name]: e.target.value }) 
        //  console.log(e.target.value)
        //  console.log(this.state)
     } 
    handleSubmit = (e) => { 
        e.preventDefault(); this.props.onSaveData(this.state); 
        this.setState({}); 
    
    } 

     componentWillMount() {
        console.log('componentWillMount MainApp');

    }

    componentDidMount(){
        //console.log('componentDidMount this.state.prevvalue');
       // console.log(this.state.prevvalue);
       // this.state.prevvalue = this.props.donatevalue
       // console.log('componentDidMount this.state.prevvalue = this.props.donatevalue');
       // console.log(this.state.prevvalue);
    }
    
    render() { 
        const { token } = this.state

        return ( 
            
            <List>
                <ListItem>
                 
                 <CountUp
                 start={0}
                 end={this.props.donatevalue}
                 duration={1}
                 delay={0}
                 separator=" "
                 decimals={7}
                 decimal="."
                 prefix=""
                 suffix=" ETH"
                 style={{style:'font-size:5px'}}
                 >
                     
                 {({ countUpRef }) => (
 
                     <div>
                     <h1><span ref={countUpRef}></span></h1>
                      </div>
                 )}
                 </CountUp>
                 <Divider />
                 </ListItem>
        <form onSubmit={this.handleSubmit}> 
        <ListItem>
                Your Now Token : {this.props.dontokenvalue}
            </ListItem>
                <ListItem>
                
                <TextField
                        id="outlined-number"
                        label="Number"
                        name="token"
                        value={token}
                        style={{ margin: 0 }}
                        onChange={this.handleChange}
                        type="number"
                       // className={classes.textField}
                        InputProps={{ classes: { input: this.props.classes.input1 }} }
                        inputProps={{ min: "0", max: this.props.dontokenvalue, step: "1" }}
                        //InputProps={{height: 1}}
                       
                        margin="normal"
                        variant="outlined"
                    />
             </ListItem>
            
            <ListItem>
                    <Button variant="outlined" color="primary" type="submit">
                    Request Token Change
                    </Button>               
            </ListItem>
           
            </form> 
            </List>


        ); 
    } 
}

export default withStyles(styles)(RequestExchangeToken);
//export default RequestExchangeToken


