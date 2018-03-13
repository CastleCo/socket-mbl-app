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
  constructor(props) {
    super(props);
    this._websocket = this._initializeWebsocket("ws://8a4922c1.ngrok.io", "woot");

    this.state = {
      refreshing: false,
      sockets: []
    }
  }
  _initializeWebsocket = (url, accessToken) => {
    var ws = new WebSocket(`${url}?access_token=${accessToken}`);
    ws.onmessage = evt => { console.log(evt); };
    return ws;
  }
  _toggleDrawer = () => { this.props.navigation.navigate('DrawerToggle'); }
  _get = (page, count) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(require('./sockets.json').slice(0, (page + 1)*count));
      }, 200)
    });
  }
  _tryRefresh = () => { return this._get(0, 50); }
  _refreshList = (evt) => {
    this.setState({ refreshing: true });
    this._tryRefresh()
      .then(sockets => {
        this.setState({
          sockets, refreshing: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ refreshing: false });
      });
  }
  componentWillMount() {
    this._tryRefresh()
      .then(sockets => {
        this.setState({ sockets });
      })
      .catch(err => {
        console.error(err);
      });
  }
  _setBrightness = (socket, brightness, emit=true) => {
    console.log(`set-brightness socket='${socket.name}' brightness=${brightness}`);
    if (emit) {
      const data = {
        channel: 'socket.brightness',
        action: 'SET',
        data: { id: socket.id, brightness }
      };
      this._websocket.send(JSON.stringify(data));
    }
    // update local state
    var sockets = this.state.sockets.map((skt) => {
      if (skt.id !== socket.id) return skt;
      return Object.assign(skt, { brightness });
    });
    this.setState({ sockets });
  }
  render() {
    return (
      <Container>
        <Header searchBar={true}>
          <Left>
            <Button transparent onPress={this._toggleDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Devices</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name="add" />
            </Button>
          </Right>
        </Header>
        <SocketList
          sockets={this.state.sockets}
          onSetBrightness={this._setBrightness}
          onRefresh={this._refreshList}
          refreshing={this.state.refreshing}
          onEndReached={this._refreshList}
        />
      </Container>
    );
  }
}
