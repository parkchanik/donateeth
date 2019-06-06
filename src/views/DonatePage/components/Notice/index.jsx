import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import Grid from '@material-ui/core/Grid';

// Material helpers
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { unstable_Box as Box } from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import './AccordingWhom.css'

// Component styles
import styles from './styles';




class Notice extends React.Component  {
   
     
      render() { 
          
        const { classes } = this.props;
        //  const classes = useStyles();
        return ( 
          
            
            <ListItem>
        
            <Grid container spacing={8} wrap="nowrap">
         
                  <Grid item xs={12} className={classes.content}>
                    <Typography variant="h6"
            color="inherit">
                      aaaaaaaaaaaaaaaaaaaaaaaddddddddddddddddddddd
                    </Typography>{' '}
                    <Typography light inline>
                      bbbbbbbbbbbbbbbbbbbbbb
                    </Typography>{' '}
                    <Typography light inline>
                     ccccccccccccccccccccc
                    </Typography>{' '}
                    <Typography light inline>
                      ddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd
                    </Typography>
                    <Typography>
                    eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee
                     </Typography>
                  </Grid>
               
                </Grid>
           
          </ListItem>
       
        ); 
    } 
}

export default withStyles(styles)(Notice);

//export default Notice
