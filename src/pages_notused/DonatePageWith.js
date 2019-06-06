import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../withRoot';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider/Divider';
import { unstable_Box as Box } from '@material-ui/core/Box';
import styled from '@material-ui/styles/styled';
import Header from '../views/DonatePage/components/Header';
import AccordingWhom from '../views/DonatePage/components/AccordingWhom/index.jsx/index.js.js.js.js';
import DonateWithMessageForm from '../views/DonatePage/components/DonateWithMessageForm/index.jsx/index.js.js.js.js.js'
import NowDonateValue from '../views/DonatePage/components/NowDonateValue/index.jsx/index.js.js.js.js'
import CurrentNetworkInfo from '../views/DonatePage/components/CurrentNetworkInfo/index.jsx/index.js.js.js.js.js'
import RequestExchangeToken from '../views/DonatePage/components/RequestExchangeToken/index.jsx/index.js.js'
import Notice from '../views/DonatePage/components/Notice/index.jsx/index.js.js.js.js'
import TrackWho from '../components/TrackWho';
import PopularNow from '../components/PopularNow';
import MessageList from '../views/DonatePage/components/MessageList';
import getWeb3 from "../utils/getWeb3";
import DonTokenContract from "../contracts/DonToken.json";

const styles = theme => ({
  root: {
    textAlign: 'center',
    paddingTop: theme.spacing.unit * 20,
  },
});

class Index extends React.Component {

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

    /// event set
        
      // 이벤트 세팅 이렇게 해놓으면 data 로 이벤트를 받는다?
      // fromblock 설정은 어떻게?? 
      
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
   // this.timer = setInterval(this.contractballance, 5000);

  };
  
  contractballance = () => {
    //const { web3 , accounts, contract } = this.state;
    const { web3 , accounts, tokencontract } = this.state;
     
      // 컨트랙트의 함수 이용 위의 내용은 CA 가 바뀌면 알수가없다 함수로 대체
   
    tokencontract.methods.getNowDonateValue().call( (err, balance) => {
    
      this.setState({ donatevalue: web3.utils.fromWei(balance,'ether') });
      })

  };

  handleDonateWithMessage = async (data) => {
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
    tokencontract.methods.DonateWithMessage(message).estimateGas({from:accounts[0] , value:wei})
    .then(result => { 
      console.log('estimateGas result')
      console.log(result)
      
    });
    
    

    tokencontract.methods.DonateWithMessage(message).send({from:accounts[0] , value:wei , gas: 210000 })
    .then(result => { 
      console.log('donatewithmessage result')
      console.log(result)
      
    });
    
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: "ee" });
  };

  RequestExchangeToETH = async (data) => {
    // const { accounts, contract} = this.state;
    const { accounts, tokencontract} = this.state;
  
    
    console.log(data)   

    var tokenvalue = parseInt(data.tokencount)

    console.log(tokenvalue)


      var ttt = tokencontract.methods.RequestExchangeToETH(tokenvalue).send({from:accounts[0] , value:0 , gas: 2100000})
     .then(result => { 
       console.log('RequestExchangeToETH result')
       console.log(result)
       
     });;
     console.log('RequestExchangeToETH');

     console.log(ttt);
     // Get the value from the contract to prove it worked.
     //const response = await contract.methods.get().call();
 
     // Update state with the result.
     //this.setState({ storageValue: "ee" });
   };

  /*
  state = {
    open: false,
  };

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  handleClick = () => {
    this.setState({
      open: true,
    });
  };
  */
  render() {
    //const { classes } = this.props;
    //const { open } = this.state;
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { messagelist , donatevalue} = this.state
    
    const Content = styled('div')({
      maxWidth: 1400,  // 전체 크기를 바꾼다 
      //padding: theme.spacing.unit * 4,
      margin: 'auto',
    });
    
    const Feed = styled('div')({
      backgroundColor: '#fff',
    });
    
    const Cover = styled('div')({
      height: 200,
      backgroundColor: '#ccd6dd',
    });
    return (
      <React.Fragment>
      <CssBaseline />
      <Header/>
      <Content>
        <Grid container spacing={16}>
          <Grid item xs={12} md={7}>
          <Box p={2} mb={1}>
          <Notice />
            </Box>
            
          
            <Box p={2} mb={1}>
            <DonateWithMessageForm onSaveData={this.handleDonateWithMessage} />
            </Box>
            
           
            <Box mt="10px">
           
              <MessageList row={messagelist} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
          <Box mb="10px">
          <CurrentNetworkInfo address={this.state.account}  currentnetwork={this.state.currentnetwork}/>
            </Box>
            <Box mb="10px">
            <NowDonateValue donatevalue={donatevalue} />
            <RequestExchangeToken onSaveData={this.RequestExchangeToETH} />
            </Box>
        
          </Grid>
          <Grid item xs={12} md={2}>
            right?
            </Grid>
        </Grid>
        </Content>
        </React.Fragment>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));
