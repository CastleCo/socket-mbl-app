import React from 'react';
import {
  Container,
  Content,
  Button,
} from 'native-base';

export default class SideMenuScreen extends React.Component {
  static navigationOptions = {
    drawerLabel : "Menu"
  }
  state = {
    sockets: [
      { name: 'Sockatoa' },
      { name: 'Sockrates' }
    ]
  }
  render() {
    return (
      <Container>
        <Content>
          <Button>Ayyyy</Button>
        </Content>
      </Container>
    );
  }
}
