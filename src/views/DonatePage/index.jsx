import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';

import withRoot from '../../withRoot';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
// Component styles
import styles from './style';

import {
    Header,
    AccordingWhom,
    DonateWithMessageForm,
    NowDonateValue,
    CurrentNetworkInfo,
    RequestExchangeToken,
    Notice,
    MessageList
  } from './components';

/*
import Header from './components/Header/Header';
import AccordingWhom from './components/AccordingWhom/AccordingWhom.js/index.js.js';
import DonateWithMessageForm from './components/DonateWithMessageForm/DonateWithMessageForm.js/index.js.js'
import NowDonateValue from './components/NowDonateValue/NowDonateValue.js/index.js.js'
import CurrentNetworkInfo from './components/CurrentNetworkInfo/CurrentNetworkInfo.js/index.js.js.js'
import RequestExchangeToken from './components/RequestExchangeToken.js'
import Notice from '../components/Notice.js'
//import TrackWho from '../components/TrackWho';
//import PopularNow from '../components/PopularNow';
import MessageList from '../components/MessageList';
*/
import getWeb3 from "../../utils/getWeb3";
import DonTokenContract from "../../contracts/DonToken.json";

/*
const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});
*/
class DonatePage extends React.Component {


  state = { storageValue: 0, web3: null, accounts: null, contract: null ,tokencontract: null , donatevalue : null , messagelist : []};

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    })

    console.log(e.target.value);
  }

  componentWillMount = async () => {
    console.log('will mount')


  }
  componentDidMount = async () => {
    
    try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();

        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();

        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        //const deployedNetwork = SimpleStorageContract.networks[networkId];
        //const deployedNetwork = DonateETHContract.networks[networkId];

        // don token 컨트렉트  주소를 따로 딴다?
        const tokendeployedNetwork = DonTokenContract.networks[networkId];
        /*
        const instance = new web3.eth.Contract(
        DonateETHContract.abi,
        deployedNetwork && deployedNetwork.address,
        );
        */
        const tokeninstance = new web3.eth.Contract(
        DonTokenContract.abi,
        tokendeployedNetwork && tokendeployedNetwork.address,
        );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
        this.setState({ web3, accounts,/* contract: instance , */tokencontract: tokeninstance });

        var network = web3.version.network;

        this.setState({account: accounts[0]});
        console.log(accounts[0]);               

        //this.DonateMessageEvent(tokeninstance);
        
        var event = tokeninstance.events.ev_DonateWithMessage({}, {fromBlock:1 , toBlock: 'latest'})
        .on('data', event => {
        // console.log('new event:', event)

          //this.state.messagelist.push(event.returnValues);
          
          this.setState(prevState => 
            ({ messagelist: [event.returnValues , ...prevState.messagelist ]}         
            )
            );

          // event 가 들어와서 messagelist array 에 push 했다 이걸 어떻게 실시간으로 리스트업 하는가?

          //console.log(event.returnValues._message)
        })
        .on('changed', event => {
          console.log('event removed from blockchain:', event)
        })
        .on('error', error => {
        console.error(error)
        })

    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    };

      this.contractballance();
      this.GetDonTokenBallance();
      this.timer = setInterval(this.contractballance, 5000);

  };

  DonateMessageEvent = async(tokeninstance) => {
    try {
          var event = tokeninstance.events.ev_DonateWithMessage({}, {fromBlock:629 , toBlock: 'latest'})
          .on('data', event => {
          // console.log('new event:', event)

            //this.state.messagelist.push(event.returnValues);
            
            this.setState(prevState => 
              ({ messagelist: [event.returnValues , ...prevState.messagelist ]}         
              )
              );

            // event 가 들어와서 messagelist array 에 push 했다 이걸 어떻게 실시간으로 리스트업 하는가?

            //console.log(event.returnValues._message)
          })
          .on('changed', event => {
            console.log('event removed from blockchain:', event)
          })
          .on('error', error => {
          console.error(error)
          })


    }
    catch (error) {
      console.log('error')
      console.log(error);
        /*
          if (this.signal) {
          this.setState({
            isLoading: false,
            error
          });
          */
      }

  }
  
 // contractballance = () => {
  contractballance = async() => {
    
    try {
        const { web3 , accounts, tokencontract } = this.state;
        console.log('contractballance contractballance contractballance')
        // 컨트랙트의 함수 이용 위의 내용은 CA 가 바뀌면 알수가없다 함수로 대체
        const response = await tokencontract.methods.getNowDonateValue().call();
        console.log(response)
        this.setState({ donatevalue: web3.utils.fromWei(response,'ether') });

    }
    catch (error) {
        console.log('error')
        console.log(error)
    }
  };

  handleDonateWithMessage = async (data) => {
  //async  handleDonateWithMessage(data) {
   // const { accounts, contract} = this.state;
   const { accounts, tokencontract} = this.state;

    console.log(data)   

    var message = data.message
    var ether = data.ether
    var wei = ether * 1000000000000000000 //1,000,000,000,000,000,000

    if (message == null) {
      message = 'Great!'
    }
    console.log(message)
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });
    //await contract.methods.DonateWithMessage("testestetset").send({from:accounts[0]}) ;
    //await contract.methods.DonateWithMessage(message).send( {from:accounts[0] , value:10000000000000000 , gas: 2100000});
    //const estimategasvalue = await tokencontract.methods.DonateWithMessage(message).estimateGas({from:accounts[0] , value:wei})

    //console.log('estimateGas result')
    //console.log(estimategasvalue)
    
    const result = await tokencontract.methods.DonateWithMessage(message).send({from:accounts[0] , value:wei , gas: 2100000})
    console.log('donatewithmessage result')
    console.log(result)
    
  };

  GetDonTokenBallance = async ()  => {
    //const { accounts, contract} = this.state;
      const { web3 , accounts , tokencontract} = this.state;

      const result = await tokencontract.methods.balanceOf(accounts[0]).call()
      console.log('GetDonTokenBallance is', result)

      const dontokenvalue = web3.utils.fromWei(result,'finney')

      this.setState({ dontokenvalue : dontokenvalue });

   
  }

  RequestExchangeToETH = async (data) => {
    // const { accounts, contract} = this.state;
    const { web3 , accounts, tokencontract} = this.state;
  
    
    console.log(data)   

    var tokenvalue = parseInt(data.token);
        
    var dontokenvalue = web3.utils.toWei(data.token,'finney');

    console.log(dontokenvalue)


      const result = await tokencontract.methods.RequestExchangeToETH(dontokenvalue).send({from:accounts[0] , value:0 , gas: 2100000})
      
      /*.then(result => { 
       console.log('RequestExchangeToETH result')
       console.log(result)
       
     });;
     */
     console.log('RequestExchangeToETH');
   
     console.log(result);
     // Get the value from the contract to prove it worked.
     //const response = await contract.methods.get().call();
 
     // Update state with the result.
     //this.setState({ storageValue: "ee" });
   };

  render() {
    const { classes } = this.props;
    //const { open } = this.state;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { messagelist , donatevalue , dontokenvalue} = this.state
        
    return (
      <div className={classes.root}>
         <Grid container spacing={1}>
         <Grid item xs={12} md={12}>
            <div className={classes.HeaderMenu}>
            <Header />
              </div>
             
                  <div className={classes.contentnotice}>
                      <Notice />
                    </div>
              </Grid>
         </Grid>
        <Grid container spacing={8}>
          <Grid item xs={12} md={1}>
            left
          </Grid>
          <Grid item xs={12} md={6}>
          <Box mt="10px">
              <div className={classes.content}>
                <DonateWithMessageForm onSaveData={this.handleDonateWithMessage} />
              </div>
              </Box>
              <Box mt="10px">
              <div className={classes.content}>
                <MessageList row={messagelist} />
                </div>
              </Box>
            
            <Box mb="10px">
            <div className={classes.content}>
               <CurrentNetworkInfo address={this.state.account}  currentnetwork={this.state.currentnetwork}/>
               </div>
            </Box>
            
          </Grid>
          <Grid item xs={12} md={3}>
             <Box mb="10px">
            <div className={classes.content}>
               <RequestExchangeToken donatevalue={donatevalue} dontokenvalue={dontokenvalue} onSaveData={this.RequestExchangeToETH} />
            </div>
            </Box>
           </Grid>
          <Grid item xs={12} md={1}>
            right?
            </Grid>
        </Grid>
      </div>
    );
  }
}

DonatePage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DonatePage);
//export default withRoot(withStyles(styles)(DonatePage));
