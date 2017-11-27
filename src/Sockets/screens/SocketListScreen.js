import React from 'react';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Title,
  Subtitle,
  Right,
  Content,
  Text
} from 'native-base';

import { SocketList } from '../components';

export default class SocketListPage extends React.Component {
  // static navigationOptions = {
  //   header: null
  // }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon ios="ios-menu" android="md-menu"/>
            </Button>
          </Left>
          <Body>
            <Title>35 Berrue Circle</Title>
            <Subtitle>Sockets</Subtitle>
          </Body>
          <Right>
            <Button transparent>
              <Icon ios="ios-add" android="md-add"/>
            </Button>
          </Right>
        </Header>
        <SocketList />
      </Container>
    );
  }
}
