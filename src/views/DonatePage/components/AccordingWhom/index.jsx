import React from 'react';
import Button from '@material-ui/core/Button/Button';
import Divider from '@material-ui/core/Divider/Divider';
import List from '@material-ui/core/List/List';
import ListItem from '@material-ui/core/ListItem/ListItem';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader/ListSubheader';
import { CSSTransitionGroup } from 'react-transition-group';
//import './styles.css'
// Material helpers
import { withStyles } from '@material-ui/core';
import styles from './styles';
//import atoms from '../atoms';

const twitterList = [
  {
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    primary: 'Never stop thinking',
    secondary: '@never_stop',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    primary: 'React Geek',
    secondary: '@react',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    primary: 'Thailand',
    secondary: '@wonderful_th',
  },
];



class AccordingWhom extends React.Component {
    //state = {};

    constructor(props) {
        super(props);
        this.state = {
            twitterListarray: [
            {
            image: 'https://randomuser.me/api/portraits/women/1.jpg',
            primary: '1111111111111111111Never stop thinking',
            secondary: '@never_stop',
            },
            {
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            primary: '222222222222React Geek',
            secondary: '@react',
            },
            {
            image: 'https://randomuser.me/api/portraits/women/2.jpg',
            primary: '33333333333333333Thailand',
            secondary: '@wonderful_th',
            },
            ]};
        this.handleAdd = this.handleAdd.bind(this);


    }
    componentDidMount () {
        console.log("AccordingWhom");
   
    }

    handleAdd() {
        console.log('handllllllle add');

        const newItem = {image: 'https://randomuser.me/api/portraits/women/2.jpg',primary: '33333333333333333Thailand', secondary: '@wonderful_th'};

        this.setState(prevState => ({
            twitterListarray: [...prevState.twitterListarray , newItem]
        }))

        /*
        const newItems = this.state.twitterListarray.concat([
          prompt('Enter some text')
        ]);
        this.setState({items: newItems});
        */
      }


    render() {

        const items  = this.state.twitterListarray.map(({ image, primary, secondary }) => (
            <div>
            <ListItem button>
                image
                <ListItemText primary={primary} secondary={secondary} />
                <Button variant="outlined" color="primary">
                Follow
                </Button>
            </ListItem>
            <Divider />
            </div>
        ))

        
        return (
            <div>
            <button onClick={this.handleAdd}>Add Item</button>

            <List subheader={<ListSubheader>According to whom</ListSubheader>}>
            <CSSTransitionGroup transitionName="example" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {items}
          </CSSTransitionGroup>
            <ListItem button>
                <ListItemText>
                Typography link>Show MoreTypography>
                </ListItemText>
            </ListItem>
            </List>
            </div>
        );
            }
}

export default withStyles(styles)(AccordingWhom);

//export default AccordingWhom;


/*
{twitterList.map(({ image, primary, secondary }) => (
    <React.Fragment key={primary}>
    <ListItem button>
        image
        <ListItemText primary={primary} secondary={secondary} />
        <Button variant="outlined" color="primary">
        Follow
        </Button>
    </ListItem>
    <Divider />
    </React.Fragment>
))}
*/