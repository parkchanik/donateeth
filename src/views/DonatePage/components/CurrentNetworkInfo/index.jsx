import React, { Component } from 'react'
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

class CurrentNetworkInfo extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
      
      }

    }

    componentWillMount() {
        console.log('componentWillMount MainApp');
//
    }

    componentDidMount(){
        console.log('componentDidMount MainApp');
      
    }
    
    render() {

        var styles = {

            background: "#ffffff",
       
            whiteSpace: "nowrap",
            
        }
        return (
            
            <ListItem>
        
            <Grid container spacing={8} wrap="nowrap">
            <Grid item>
                <Grid container spacing={16}>
                  <Grid item xs={12}>
                    <Typography bold inline>
                    <strong>Your Address</strong>: {this.props.address}   <strong>Current NetWork</strong>: {this.props.currentnetwork}

                    </Typography>{' '}
                    <Typography light inline>
                    <strong>Balance</strong>: <span id="TTBalance"></span> {this.props.storageValue} Ang Token<br/><br/>
           
                    </Typography>{' '}
              
                  </Grid>
               
                </Grid>
              </Grid>
            </Grid>
          </ListItem>


       

        );

    }
}


export default CurrentNetworkInfo
