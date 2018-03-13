import React from 'react';
import {
  Left,
  Button,
  Icon
} from 'native-base';

export default class MenuButton extends React.Component {
  render() {
    return (<Left>
      <Button transparent onPress={this.props.onPress}>
        <Icon ios="ios-menu" android="md-menu"/>
      </Button>
    </Left>)
  }
}
