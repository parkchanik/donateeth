import React, { Component } from 'react'


/*const options = [
    { value: 0.01, label: '0.01 EHTER' },
    { value: 0.1, label: '0.1 ETHER' },
    { value: 1, label: '1 ETHER' },
  ]
            
  const defaultOption = this.state.selected*/
/*<Dropdown options={options} onChange={this.Ondropdownchange} value={defaultOption} placeholder="Select an option" /> */

//import 'react-dropdown/style.css'
/*
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
*/
import { Jumbotron , DropdownButton , ToggleButtonGroup , ToggleButton , ButtonToolbar , FormGroup , ControlLabel , HelpBlock , FormControl , Button} from 'react-bootstrap'

//import '../css/Header.css'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
     
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    button: {
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
  });



  const cansendeth = [
    {
      value: 0.01,
      label: '0.01 ETH',
    },
    {
      value: 0.1,
      label: '0.1 ETH',
    },
    {
      value: 1,
      label: '1 ETH',
    },    
  ];


class SendBoxForm extends Component {
    constructor(props) {
      super(props)
  
      this.state = {
      
        BoxMessageValue: '',
        BoxETHValue: 0.01 ,
      
        //selected: { value: 0.01, label: '0.01 EHTER' }
     }

        //this.onSendABox = this.onSendABox.bind(this);
        this.BoxMessageInput = this.BoxMessageInput.bind(this);
        //.BoxETHInput = this.BoxETHInput.bind(this);
        //this.radiocheckchange = this.radiocheckchange.bind(this);
        this.Ondropdownchange = this.Ondropdownchange.bind(this);
        
        this.onSubmit = this.onSubmit.bind(this);
    }

        
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmit({
       // price: web3.utils.toWei(this.state.price, this.state.unit),
            BoxETHValue: this.state.BoxETHValue,
            BoxMessageValue: this.state.BoxMessageValue
       
        });
    }
    
    componentWillMount() {
        console.log('componentWillMount SendBoxForm');

    }

    componentDidMount(){
        console.log('componentDidMount SendBoxForm');
      
    }
  
    BoxMessageInput(event) {
         console.log(event.target.value);
        this.setState ({
        BoxMessageValue: event.target.value
        });
    }
    

  Ondropdownchange(option) {
    
        console.log(`You selected ${option.label}, with value ${option.value}`)
     
        this.setState ({
        BoxETHValue: parseFloat(option.value)
        });

        this.setState({selected: option});
    }

    handleChange = event => {
        console.log(event);
       // console.log(event.target.value );
       // console.log(event.target.name);
        this.setState({ BoxETHValue: event });
    };

    getValidationState() {
        const length = this.state.BoxMessageValue.length;
        if (length > 10) return 'success';
        else if (length > 5) return 'warning';
        else if (length > 0) return 'error';
        return null;
      }
    

    render() {
        
          const { classes } = this.props;

          return (
            <div>
                    <div  style={{ textAlign:"center"}}>
                        <h4>METAMASK 를 이용해 주세요!</h4>
                    </div>
         
                <form onSubmit={this.onSubmit}>
                <h4>ETHEREUM</h4>
                <div  style={{ width:"3000px"}}>
                <ButtonToolbar>
                    <ToggleButtonGroup type="radio" name="options"  onChange={this.handleChange} defaultValue={this.state.BoxETHValue}>
                    {
                             cansendeth.map(option => (
                            <ToggleButton value={option.value}>{option.label}</ToggleButton>
                        ))
                        }
                   </ToggleButtonGroup>
            </ButtonToolbar>
             </div>
             <div>
                <FormGroup
                        controlId="formBasicText"
                        //validationState={this.getValidationState()}
                >
                   
                    <FormControl
                        type="text"
                        value={this.state.BoxMessageValue}
                        placeholder="Enter text"
                        onChange={this.BoxMessageInput}
                    />
                    <FormControl.Feedback />
                    
                    </FormGroup>
             </div>
             <div>
             <Button  bsSize="xsmall" type="submit">
                SEND ETH AND MESSAGE!
                </Button>
             </div>
                    
                </form>
           </div>
         
        );

    }
}


export default SendBoxForm