import React from 'react';
import CountUp from 'react-countup';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Typography from '@material-ui/core/Typography';
class NowDonateValue extends React.Component  {
    constructor(props) {
        super(props)
       //this.state = {age : ''} 
    }
    
    /*
     state = {} 
     
     handleChange = (e) => { 
         this.setState({ [e.target.name]: e.target.value }) 
    } 
    
    handleSubmit = (e) => { 
        e.preventDefault(); this.props.onSaveData(this.state); 
        this.setState({}); 
    
    } 
    */
     componentWillMount() {
        console.log('componentWillMount MainApp');

    }

    componentDidMount(){
        console.log('componentDidMount this.state.prevvalue');
     
        console.log('componentDidMount this.state.prevvalue = this.props.donatevalue');
       
    }
    
    render() { 

        
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
            </List>
             


        ); 
    } 
}

export default NowDonateValue


