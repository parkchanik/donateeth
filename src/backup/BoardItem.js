import React from 'react';

class BoardItem extends React.Component { 
    
    componentDidMount(){
        //console.log('BoardItem componentDidMount');
        //console.log(this.props.row._message);
      
    }
    render() { 
        return( 
        <tr> 
            <td>{this.props.row._message}</td> 
            <td>{this.props.row._sender}</td> 
        </tr>
        
        ); } 
}

export default BoardItem 
