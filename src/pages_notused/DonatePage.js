import React, { Component } from "react";

//import DonateETHContract from "../contracts/DonateETH.json";
import DonTokenContract from "../contracts/DonToken.json";
import getWeb3 from "../utils/getWeb3";


import CurrentNetworkInfo from '../components/CurrentNetworkInfo'

import DonateWithMessageForm from '../components/DonateWithMessageForm'
import NowDonateValue from '../components/NowDonateValue'

import CardMessage from '../components/CardMessage'

import { Container , Header, Table, Rating , Card , Feed , Grid} from 'semantic-ui-react'

class DonatePage extends Component {
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
      /*
      var event = instance.events.ev_DonateWithMessage({}, {fromBlock:63 , toBlock: 'latest'})
      .on('data', event => {
       // console.log('new event:', event)

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

     // console.log(event)


      */
////////////////////////////// Tranfer event 테스트 용
/////////////////////////////////////////////////////////////////////
    var event1 = tokeninstance.events.ev_RequestExchangeToETH({}, {fromBlock:0 , toBlock: 'latest'})
    .on('data', event => {
      console.log('new ev_RequestExchangeToETH event:', event)

      //this.state.messagelist.push(event.returnValues);
      /*
      this.setState(prevState => 
        ({ messagelist: [...prevState.messagelist, event.returnValues]}         
        )
        );
          */
      // event 가 들어와서 messagelist array 에 push 했다 이걸 어떻게 실시간으로 리스트업 하는가?

      //console.log(event.returnValues._message)
    })
    .on('changed', event => {
      console.log('event removed from blockchain:', event)
    })
    .on('error', error => {
    console.error(error)
    })

    console.log(event1);


  ///////////////////////////////////////////////////////////////
      
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
   // const { accounts, contract} = this.state;
   const { accounts, tokencontract} = this.state;

    console.log(data)   

    var message = data.message

    console.log(message)
    // Stores a given value, 5 by default.
    //await contract.methods.set(5).send({ from: accounts[0] });
    //await contract.methods.DonateWithMessage("testestetset").send({from:accounts[0]}) ;
    //await contract.methods.DonateWithMessage(message).send( {from:accounts[0] , value:10000000000000000 , gas: 2100000});
    tokencontract.methods.DonateWithMessage(message).send({from:accounts[0] , value:10000000000000000 , gas: 2100000})
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
 

   ChangeServerManager = async () => {
    // const { accounts, contract} = this.state;
    const { accounts, tokencontract} = this.state;
  
    
      var ttt = tokencontract.methods.ChangeServerManager('0xB65Fc25848e5809913cb5E1a56cB51eaA971Fc0D').send({from:accounts[0] , value:0 , gas: 2100000})
     .then(result => { 
       console.log('ChangeServerManager result')
       console.log(result)
       
     });;
     console.log('ChangeServerManager');

   };

   /*
  SendEtherToRequestUser = async () => {
    // const { accounts, contract} = this.state;
    const { accounts, tokencontract} = this.state;
  

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

  */
 

 PopExchangeUserFirst = async () => {
  // const { accounts, contract} = this.state;
  const { accounts, tokencontract} = this.state;

  
    var ttt = tokencontract.methods.PopExchangeUserFirst().send({from:accounts[0] , value:0 , gas: 2100000})
   .then(result => { 
     console.log('PopExchangeUserFirst result')
     console.log(result)
     
   });;
   console.log('PopExchangeUserFirst');

 };
 
  getOwner = async ()  => {
    //const { contract} = this.state;
    const { tokencontract} = this.state;
    
   // console.log(accounts[0])
   tokencontract.methods.GetOwner().call( (err, balance) => {
     console.log('getOwner')
     console.log(err)
    console.log('getOwner is', balance)
    })

  }

  GetServerManager = async ()  => {
    //const { contract} = this.state;
    const { tokencontract} = this.state;
    
   // console.log(accounts[0])
   tokencontract.methods.GetServerManager().call( (err, balance) => {
     console.log('GetServerManager')
     console.log(err)
    console.log('GetServerManager is', balance)
    })

  }
  

  /*
  getDonTokenOwnerBallance = async ()  => {
    const { accounts, contract} = this.state;

    console.log(accounts[0])
   contract.methods.ownerbalanceOf().call( (err, balance) => {
     console.log('getDonTokenOwnerBallance')
     console.log(err)
    console.log('getDonTokenOwnerBallance is', balance)
    })

  }
  */
 getDonTokenBallanceFromContract = async ()  => {
  //const { accounts, contract} = this.state;
  const {accounts , tokencontract} = this.state;
  
  console.log(accounts[0])
  tokencontract.methods.balanceOf(accounts[0]).call( (err, balance) => {
     console.log('call contract balanceof')
     console.log(err)
    console.log('call contract  balance is', balance)
    })


 }

 

 GetExchangeUserLastIdx  = async ()  => {
  const {accounts , tokencontract} = this.state;
  
  console.log(accounts[0])
  tokencontract.methods.GetExchangeUserLastIdx().call( (err, balance) => {
     console.log('call contract GetExchangeUserLastIdx')
     console.log(err)
    console.log('call contract  GetExchangeUserLastIdx is', balance)
    })
 }

 GetExchangeUserFirstIdx  = async ()  => {
  const {accounts , tokencontract} = this.state;
  
  console.log(accounts[0])
  tokencontract.methods.GetExchangeUserFirstIdx().call( (err, balance) => {
     console.log('call contract GetExchangeUserFirstIdx')
     console.log(err)
    console.log('call contract  GetExchangeUserFirstIdx is', balance)
    })
 }


 GetExchangeUserFirst  = async ()  => {
  const {accounts , tokencontract} = this.state;
  
  console.log(accounts[0])
  tokencontract.methods.GetExchangeUserFirst().call( (err, balance) => {
     console.log('call contract GetExchangeUserFirst')
     console.log(err)
    console.log('call contract  GetExchangeUserFirst is', balance)
    })
 }
 GetExchangeUserLast  = async ()  => {
  const {accounts , tokencontract} = this.state;
  
  console.log(accounts[0])
  tokencontract.methods.GetExchangeUserLast().call( (err, balance) => {
     console.log('call contract GetExchangeUserLast')
     console.log(err)
    console.log('call contract  GetExchangeUserLast is', balance)
    })
 }

 
 GetExchangeUser  = async ()  => {
  const {accounts , tokencontract} = this.state;
  
  console.log(accounts[0])
  tokencontract.methods.GetExchangeUser(1).call( (err, balance) => {
     console.log('call contract getRequestExchangeToETH')
     console.log(err)
    console.log('call contract  getRequestExchangeToETH is', balance)
    })
 }
  getDonTokenBallance = async ()  => {
    //const { accounts, contract} = this.state;
    const {accounts , tokencontract} = this.state;
    
    
   console.log(accounts[0])
   tokencontract.methods.balanceOf(accounts[0]).call( (err, balance) => {
     console.log('balanceof')
     console.log(err)
    console.log('balance is', balance)
    })

    
  }
  testcallstate = () => {
      console.log(this.state.messagelist);
  }
  contractballance = () => {
    //const { web3 , accounts, contract } = this.state;
    const { web3 , accounts, tokencontract } = this.state;
    
  
    // 컨트랙트의 함수 이용 위의 내용은 CA 가 바뀌면 알수가없다 함수로 대체
   console.log(accounts[0])
   tokencontract.methods.getNowDonateValue().call( (err, balance) => {
     console.log('Now Contract Ballance')
     console.log(err)
    console.log('Now Contract Ballance is', balance)
    this.setState({ donatevalue: web3.utils.fromWei(balance,'ether') });
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

      <Grid celled='internally'>
      <Grid.Row>
        <Grid.Column>
          <CurrentNetworkInfo address={this.state.account}  currentnetwork={this.state.currentnetwork}/>
          <input type="button" name="dddddd" title="testcallstate" value="testcallstate" onClick={this.getDonTokenBallance}/>
          <input type="button" name="eeeee" title="balancefromcontract" value="balancefromcontract" onClick={this.getDonTokenBallanceFromContract}/>
          <input type="button" name="ggggg" title="getOwner" value="getOwner" onClick={this.getOwner}/>
         <input type="button" name="ttttttt" title="RequestExchangeToETH" value="RequestExchangeToETH" onClick={this.RequestExchangeToETH}/>
          <input type="button" name="ttttttt" title="GetExchangeUser" value="GetExchangeUser" onClick={this.GetExchangeUser}/>
          
          <input type="button" name="ttttttt" title="GetExchangeUserLastIdx" value="GetExchangeUserLastIdx" onClick={this.GetExchangeUserLastIdx}/>
          <input type="button" name="ccccccc" title="GetExchangeUserFirstIdx" value="GetExchangeUserFirstIdx" onClick={this.GetExchangeUserFirstIdx}/>
          
          <input type="button" name="ccccccc" title="GetExchangeUserLast" value="GetExchangeUserLast" onClick={this.GetExchangeUserLast}/>
          <input type="button" name="ccccccc" title="GetExchangeUserFirst" value="GetExchangeUserFirst" onClick={this.GetExchangeUserFirst}/>
                    
          <input type="button" name="hhhhhhh" title="ChangeServerManager" value="ChangeServerManager" onClick={this.ChangeServerManager}/>
          <input type="button" name="hhhhhhh" title="GetServerManager" value="GetServerManager" onClick={this.GetServerManager}/>

          <input type="button" name="jjjjjjjj" title="PopExchangeUserFirst" value="PopExchangeUserFirst" onClick={this.PopExchangeUserFirst}/>
          
          
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
          <Grid.Column width={10}>
                <CardMessage row={messagelist} /> 
          </Grid.Column>
          <Grid.Column width={6}>
          <Grid>
            <Grid.Row >
              <Grid.Column >
                <DonateWithMessageForm onSaveData={this.handleDonateWithMessage} />
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column>
                <NowDonateValue onSaveData={this.RequestExchangeToETH} donatevalue={donatevalue} />
                </Grid.Column>
            </Grid.Row>
            </Grid>
          </Grid.Column>
      </Grid.Row>
     </Grid>
    );
  }
}

export default DonatePage;
