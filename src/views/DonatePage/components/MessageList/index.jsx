import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import { CSSTransitionGroup } from 'react-transition-group';
import './styles.css'
//import atoms from '../atoms';

//const { Avatar, Typography } = atoms;

class MessageList extends React.Component {
      //  {twitterList.map(({ image, primary, secondary }) => (

      
        render() {

          
        const items  = this.props.row.map(({ image, _message, secondary , primary , _sender}) => (
          <React.Fragment key={primary}>
          <ListItem>
              <ListItemText primary={_message} secondary={_sender} />
          
          </ListItem>
          <Divider />
          </React.Fragment>
        ))

        return (
         <div>
            <List subheader={<ListSubheader>Conversation</ListSubheader>}>
          <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {items}
          </CSSTransitionGroup>
       
            </List>
        </div>
        );
        }
    }

export default MessageList;
