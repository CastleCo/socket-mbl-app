import React from 'react';
import { FlatList } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

import { SocketListItem } from '.';

export default class SocketList extends React.PureComponent {
  constructor(props) {
    super(props);
    
    this.state = {
      toggled: new Map(),
    };
  }
  _keyExtractor = (item, index) => (item.id)
  _toggleSlider = (id) => {
    // toggle the slider for toggled socket
    console.log(`toggle-slider socket='${id}'`);
    
    this.setState((state) => { // copy the map rather than modifying state.
      const toggled = new Map(state.toggled);
      toggled.set(id, !toggled.get(id)); // toggle
      return { toggled };
    });
  }
  render() {
    return (
      <FlatList
        style={{ backgroundColor: "#fff"}}
        data={this.props.sockets}
        extractData={this.props}
        keyExtractor={this._keyExtractor}
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        renderItem={({ item }) => (
          <SocketListItem
            name={item.name}
            brightness={item.brightness}
            iconUrl={item.icon.url}
            showSlider={this.state.toggled.get(item.id)}
            setBrightness={(brightness, emit) => this.props.onSetBrightness(item, brightness, emit)}
            onPress={_ => this._toggleSlider(item.id)}
          />
        )}/>
    );
  }
}
