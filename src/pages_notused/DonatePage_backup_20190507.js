import React, { Component } from "react";

import DonateETHContract from "../contracts/DonateETH.json";
import getWeb3 from "../utils/getWeb3";


import CurrentNetworkInfo from '../components/CurrentNetworkInfo'

//import Input from '../components/Input'
import Button from '../components/Button'

import DonateWithMessageForm from '../components/DonateWithMessageForm'
import NowDonateValue from '../components/NowDonateValue'
import BoardItem from '../components/BoardItem'
import CardMessage from '../components/CardMessage'

import { Container , Header, Table, Rating , Card , Feed } from 'semantic-ui-react'

class DonatePage extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null , donatevalue : null , messagelist : []};

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
      const deployedNetwork = DonateETHContract.networks[networkId];
      
      const instance = new web3.eth.Contract(
        DonateETHContract.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      //this.setState({ web3, accounts, contract: instance }, this.runExample);
      this.setState({ web3, accounts, contract: instance });

      var network = web3.version.network;
       
      this.setState({account: accounts[0]});
        console.log(accounts[0]);

    /// event set
        
      // 이벤트 세팅 이렇게 해놓으면 data 로 이벤트를 받는다?
      // fromblock 설정은 어떻게?? 
      var event = instance.events.ev_DonateWithMessage({}, {fromBlock:63 , toBlock: 'latest'})
      .on('data', event => {
        console.log('new event:', event)

        //this.state.messagelist.push(event.returnValues);
        
        this.setState(prevState => 
          ({ messagelist: [...prevState.messagelist, event.returnValues]}         
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

      console.log(event)
      
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    this.contractballance();
    this.timer = setInterval(this.contractballance, 5000);

  };
  /*
  setEventsMessage  = async () => {
      const {  contract } = this.state;
    var event = contract.events.ev_DonateWithMessage({}, {fromBlock:0 , toBlock: 'latest'})
    .on('data', event => {
      console.log('new event:', event)
    })
    .on('changed', event => {
      console.log('event removed from blockchain:', event)
    })
    .on('error', error => {
    console.error(error)
    })

    console.log(event)
  };
  */

  handleDonateWithMessage = async (data) => {
    const { accounts, contract} = this.state;

    console.log(data)   

    var message = data.message

    console.log(message)
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });
    //await contract.methods.DonateWithMessage("testestetset").send({from:accounts[0]}) ;
    await contract.methods.DonateWithMessage(message).send( {from:accounts[0] , value:10000000000000000 , gas: 2100000});
    
    // Get the value from the contract to prove it worked.
    //const response = await contract.methods.get().call();

    // Update state with the result.
    //this.setState({ storageValue: "ee" });
  };

  testcallstate = () => {
      console.log(this.state.messagelist);
  }
  contractballance = () => {
    const { web3 , accounts, contract } = this.state;
    //console.log(contract.address);

   // var nowdonatevalue =  contract.methods.getNowDonateValue().send({ from: accounts[0] });

    //console.log(nowdonatevalue);

    //var result = web3.eth.getBalance('0x86fbb00D229B7792D28C9dBFDeafAdAF25bABE7B');
    //console.log(result)
    //console.log(web3.utils.fromWei(result,'ether'));
    //this.setState({ donatevalue: result });
    web3.eth.getBalance('0x86fbb00D229B7792D28C9dBFDeafAdAF25bABE7B').then(result  => {
      console.log(result)
      console.log(web3.utils.fromWei(result,'ether') )
      this.setState({ donatevalue: web3.utils.fromWei(result,'ether') });
    })
    /*
    web3.eth.getBalance('0x86fbb00D229B7792D28C9dBFDeafAdAF25bABE7B',function(error,result){

      if(error){
         console.log(error)
      }
      else{
        console.log('getBalance')
         console.log(result)
         console.log(web3.utils.fromWei(result,'ether') )
         this.setState({ donatevalue: web3.utils.fromWei(result,'ether') });
         //nowvalue  = web3.utils.fromWei(result,'ether')
         //console.log('nowvalue = ' + nowvalue)
             
      }
      

    })*/

   //console.log(nowvalue)

   //console.log('now value' + nowvalue);
   //this.setState({ donatevalue: nowvalue });

   /*
   event.get((error,eventResult) => {
    if(error)
    console.log('error' + error);
    else
      console.log(eventResult);
  });
  */
  };

  render() {
    if (!this.state.web3) {
      return <div>Loading Web3, accounts, and contract...</div>;
    }
    const { messagelist , donatevalue} = this.state
    return (
      <div class="ui two column centered grid">
      <div class="column"><CurrentNetworkInfo address={this.state.account}  currentnetwork={this.state.currentnetwork}/></div>
      <div class="three column centered row">
            <div class="column">
              <Card>
                <Card.Content>
                  <Card.Header>Recent Message </Card.Header>
                </Card.Content>
                <Card.Content>
                    <Feed>
                    {
                      messagelist.map( row => { return ( <CardMessage row={row} /> ) })
                    }
                    </Feed>
                </Card.Content>
              </Card>
          </div>
          <div class="column">
          <Container>
         <DonateWithMessageForm onSaveData={this.handleDonateWithMessage} />
         </Container>
         <Container>
          <NowDonateValue donatevalue={donatevalue} />
          </Container>
          <input type="button" name="dddddd" title="testcallstate" value="testcallstate" onClick={this.testcallstate}/>

                    <Button
            className="LoginForm__button"
            title="GetBallance"
            onClick={this.contractballance}
            />
            
            </div>
          
        </div>
      </div>
      
          
          
          
    );
  }
}

export default DonatePage;
