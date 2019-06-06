import React, { Component } from 'react'
//import axios from 'axios';


//import { Navbar, Jumbotron, Button } from 'react-bootstrap';

//import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
const styles = {
    card: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      marginBottom: 16,
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  };

class Ranking extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
        rankdata : []       
      }

    }

    /*
    componentWillMount() {
        console.log('componentWillMount RankingApp');
       
    }
    */
    componentDidMount(){
        console.log('componentDidMount RankingApp');
            
        this.getRankingData();
        console.log('ababababa');
        
        //setTimeout(this.getRankingData , 1000 * 5);
        //console.log(this.state.rankdata);

    }

    getRankingData() {
        console.log('getRankingData');
            //let getrank = () => {
                //axios.get('http://localhost:3030/sendaboxranking')
                /*
                axios.get('http://localhost:3030/api/v1/sendaboxranking')
                .then (response => {
                    console.log(response.data);
                    console.log('------end response.data');
                    //const posts = response.data.map(obj => obj.data);
                    //const data = response.data;  
                    const vals = JSON.stringify(response.data.result);
                    this.setState( {rankdata : JSON.parse(vals)});
                    console.log(this.state.rankdata); 
                    
                })
                .catch(function (e) {
                    console.log(e);
                });
*/
                
               // setTimeout(getRankingData() , 10000 * 5);
            //}
                  //fetch('http://localhost:3030/sendaboxranking')
                /*
                .then(response => response.json())
                .then(data => {
                    console.log('aaaaa');
                    console.log(data);
                    console.log('bbbbb');
                    this.setState({rankdata : JSON.parse(data)});
                    console.log(this.state.rankdata);
                    
                    
                    this.state.rankdata.map((contact, i) => {

                        console.log(contact.rank);
                        console.log(contact.sender_address);
                    });
                    
                })
                */
           


    }


    /*
    componentDidMount(){
        console.log('componentDidMount');
        fetch('http://localhost:3030/sendaboxranking',{
            method: 'get',
            dataType: 'json',
            mode: 'no-cors',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin' : '*'
            }
        })
        .then((response) => { console.log(response.json()) })
        .then((responseData) => {
            console.log(responseData);
            //this.setState({mans: responseData});
        })
        .catch((error)=>{
            console.log(error);
            console.log('Error fetching man',error);
        });
    }
    */

    /*
   columns () {
    return [
    	{key: 'rank', label: 'Rank'},
        {key: 'sender_address', label: 'sender_address'},
        {key: 'last_boxmsg', label: 'last_boxmsg', cell: (obj, key) => {
            return <span>{ obj[key] }</span>;
        }}
    ];
  }
*/

    render() {
       
          var rankinglist =  this.state.rankdata.map(item =>
                        <div>
                        <h4> Rank : { item.Rank } </h4>
                        
                        <h3> Addr : { item.Sender_address } </h3> 
                         <br></br>
                        <h3>{ item.Last_boxmsg } </h3>
                
                     </div>
                 
         
        );

        

        // <h4>key  {this.props.uniquekey} </h4>
        return (
            <div>
             <div  style={{ textAlign:"center"}}>
                        <h4>RANKING</h4>
                    </div>
              
               {rankinglist}
         
              
            </div>

        );

    }
}


//export default withStyles(styles)(Ranking)
export default Ranking

/* 랭킹 부분을 우측으로 옮겨서 Grid Row 가 필요 없어 져서 주석처리
var rankinglist =
(
    <Grid>
    <Row className="show-grid">
        {this.state.rankdata.map(item =>
                 <Col sm={12} md={12}>
               <code>
                <h4> Rank : { item.rank } </h4>
                
                <h3> Addr : { item.sender_address } </h3> 
                 <br></br>
                <h3>{ item.last_boxmsg } </h3>
             dasfasdasdf
             


            </code>
                
                </Col>
         
            )}
        </Row>
    </Grid>
 
);
*/

/* DIV 로만 가로로
  var rankinglist = this.state.rankdata.map(item =>
               
            <div  style={{ border: "1px solid gold", float: "left", width: "30%", padding:"10px"} } lg={12}> 
            RANK : { item.rank }  ADDRESS { item.sender_address } 
            <h4>  { item.last_boxmsg }  </h4>
           
                <br/><br/>
                </div>
              
            
          );

*/
/*

        var rankinglist =
        (
            <Grid container style={{flexGrow: 1}} spacing={16}>
            <Grid item xs={3}>
              <Grid container justify="center" spacing={Number(16)}>
                {this.state.rankdata.map(item =>
                        
                        <div>
                        { item.rank } 
                       { item.sender_address } 
                         { item.last_boxmsg } 
                     
                        </div>
                 
                    )}
                </Grid>
            </Grid>
            </Grid>
        );
*/
/*
 {this.state.rankdata.map(function(item , index) {
                return (
                   
                    <div>
                    { item.rank } 
                   { item.sender_address } 
                     { item.last_boxmsg } 
                   { index } 
                    </div>
                    )
            })


              
        var rankinglist =
        (
            <Grid > 
            <Row>
                {this.state.rankdata.map(item =>
                   
                        <Col sm={2}>
              
                            <Card style={{"minWidth": "275"}}>
                                <CardContent>
                                <Typography style={{
                                                    marginBottom: 16,
                                                    fontSize: 14,
                                                }} color="textSecondary">
                                <b>{ item.sender_address } </b>
                                </Typography>
                                <Typography variant="headline" component="h2">
                                <p>{ item.send_wei } </p> 
                                </Typography>
                                <Typography style={{marginBottom: 12}} color="textSecondary">
                                    adjective
                                </Typography>
                                <Typography component="p">
                                   <h4> { item.last_boxmsg } </h4>
                                    <br />
                                    {'"a benevolent smile"'}
                                </Typography>
                                </CardContent>
                                <CardActions>
                                <Button size="small">Learn More</Button>
                                </CardActions>
                            </Card>
                                
                               
                        
                        </Col>
                       
                     
                 
                    )}
            </Row>       
            </Grid>
        );

            */