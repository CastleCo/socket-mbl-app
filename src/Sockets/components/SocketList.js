import React from 'react';
import { ListView, FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

import SocketListItem from './SocketListItem';

export default class SocketList extends React.Component {
  constructor(props) {
    super(props);
    
    this._websocket = this._initializeWebsocket("ws://8a4922c1.ngrok.io", "woot");
    
    this.state = {
      refreshing: false,
      sockets: [],
      selected: (new Map() : Map<string, boolean>),
    };
  }
  componentWillMount() {
    // emulate network req
    setTimeout(()=> {
      this.setState({ sockets: require('./sockets.json').slice(0, 30) });
    }, 200)
  }
  _setBrightness = (socket, brightness, emit=false) => {
    console.log(`Set socket:${socket.name} to brightness:${brightness}`);
    if (emit) {
      var data = {
        channel: 'socket.brightness',
        action: 'SET',
        data: { id: socket.id, brightness }
      };
      console.log("[sending]", data);
      this._websocket.send(JSON.stringify(data));
    }
    
    // update local state
    var sockets = this.state.sockets.map((skt) => {
      if (skt.id === socket.id) return Object.assign(skt, { brightness })
      else { return skt; }
    });
    this.setState({ sockets });
  }
  _refreshList = (evt) => {
    console.log(evt);
    this.setState({ refreshing : true });
    console.log("refresh: ", evt);
    setTimeout(_ => {
      this._websocket = this._initializeWebsocket("ws://8a4922c1.ngrok.io", "woot");
      this.setState({ refreshing: false });
    }, 200);
  }
  _initializeWebsocket = (url, accessToken) => {
    var ws = new WebSocket(`${url}?access_token=${accessToken}`);
    ws.onmessage = evt => { console.log(evt); };
    return ws;
  }
  _keyExtractor = (item, index) => item.id;
  _toggleSlider = (id) => {
    // toggle the slider for selected socket
    console.log(`toggling: ${id}`);
    
    this.setState((state) => { // copy the map rather than modifying state.
      const selected = new Map(state.selected);
      selected.set(id, !selected.get(id)); // toggle
      return { selected };
    });
  }
  render() {
    return (
      <FlatList
        style={{ backgroundColor: "#fff"}}
        data={this.state.sockets}
        extractData={this.state}
        keyExtractor={this._keyExtractor}
        refreshing={this.state.refreshing}
        onRefresh={this._refreshList}
        renderItem={({ item }) => (
          <SocketListItem
            name={item.name}
            brightness={item.brightness}
            iconUrl={item.icon.url}
            showSlider={this.state.selected.get(item.id)}
            setBrightness={(brightness, emit) => this._setBrightness(item, brightness, emit)}
            onPress={_ => this._toggleSlider(item.id)}
          />
        )}/>
    );
  }
}
