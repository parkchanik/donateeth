
import React from 'react';
import {AppBar, Tabs, Tab} from '@material-ui/core';

export default class HeaderTest extends React.Component {
    state = {
      open: false,
    };
  
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  
    render() {
      return (
        <div>
        <AppBar title="My App">
        <Tabs>
          <Tab label="Item 1" />
          <Tab label="Item 2" />
          <Tab label="Item 3" />
          <Tab label="Item 4" />
        </Tabs>
      </AppBar>
        </div>
      );
    }
  }