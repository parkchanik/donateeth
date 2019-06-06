import React from 'react';


class BoardForm extends React.Component  {
     state = {} 
     
     handleChange = (e) => { 
         this.setState({ [e.target.name]: e.target.value }) 
    } 
    
    handleSubmit = (e) => { 
        e.preventDefault(); this.props.onSaveData(this.state); this.setState({}); 
    
    } 
    
    render() { 
        return ( 
        <form onSubmit={this.handleSubmit}> 
        <input placeholder="title" name="brdtitle" onChange={this.handleChange}/> 
        <input placeholder="name" name="brdwriter" onChange={this.handleChange}/> 
        <button type="submit">Save</button> </form> 
        ); 
    } 
}

export default BoardForm
