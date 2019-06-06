import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';


//import './AccordingWhom.css'
const styles = {
    input1: {
      height: 1,

    },
    input2: {
      height: 200,
      fontSize: "3em"
    }
  };

class DonateWithMessageForm extends React.Component  {
     constructor(props) {
         super(props)
        this.state = {ether : 0.005 , message : ''} 
     }
     
     
    handleChange = e => { 
       console.log(e.target.value)
         this.setState({ [e.target.name]: e.target.value }) 
       //  console.log(e.target.value)
       //  console.log(this.state)
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
    
    render() { 
        const { ether } = this.state
     

        //  const classes = useStyles();
        return ( 
            <List>
                  <form onSubmit={this.handleSubmit}> 
              <ListItem>
              <TextField
                    id="outlined-full-width"
                    label="Your Message"
                    style={{ margin: 0 }}
                    placeholder="Message!!!!!!!!!!!!!!"
                    onChange={this.handleChange}
                    fullWidth
                    margin="normal"
                    name="message"
                    variant="outlined"
                    InputProps={{ classes: { input: this.props.classes.input1 } }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                ></TextField>
                </ListItem>
                <ListItem>
                <TextField
                        id="outlined-number"
                        label="Ether"
                        name="ether"
                        value={ether}
                        style={{ margin: 0 }}
                        onChange={this.handleChangeEther}
                        type="number"
                       // className={classes.textField}
                        InputProps={{ classes: { input: this.props.classes.input1 }} }
                        inputProps={{ min: "0.005", max: "1", step: "0.001" }}
                        //InputProps={{height: 1}}
                       
                        margin="normal"
                        variant="outlined"
                    />
                      <Typography bold inline>
                    <strong>Your Address</strong>:    <strong>Current NetWork</strong>:

                    </Typography>{' '}
                </ListItem>
                <ListItem>
                <Button variant="outlined" color="primary" type="submit">
                      Send To Message !
                        </Button>
                </ListItem>
                  </form> 
                
                </List>
            
       
        ); 
    } 
}
export default withStyles(styles)(DonateWithMessageForm);
//export default DonateWithMessageForm
