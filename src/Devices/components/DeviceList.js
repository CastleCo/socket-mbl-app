import React from 'react';
import PropTypes from "prop-types";
import { FlatList } from 'react-native';

import { SocketListItem } from '.';

export default class DeviceList extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = { expanded: new Map() };
  }
  _keyExtractor = (item, index) => (item.id)
  _expandItem = (id) => {
    // toggle the slider for toggled socket
    console.log(`expand-item device='${id}'`);
    
    this.setState((state) => { // copy the map rather than modifying state.
      const expanded = new Map(state.expanded);
      expanded.set(id, !expanded.get(id)); // toggle
      return { expanded };
    });
  }
  render() {
    return (
      <FlatList
        style={{ backgroundColor: "#fff"}}
        data={this.props.devices}
        extractData={this.props}
        keyExtractor={this._keyExtractor}
        refreshing={this.props.refreshing}
        onRefresh={this.props.onRefresh}
        onEndReachedThreshold={0.5}
        onEndReached={this.props.onEndReached}
        renderItem={({ item }) => (
          <SocketListItem
            attributes={{
              brightness: item.brightness
            }}  
            name={item.name}
            brightness={item.brightness}
            iconUrl={item.icon.url}
            showSlider={this.state.expanded.get(item.id)}
            expanded={this.state.expanded.get(item.id)}
            setBrightness={brightness => this.props.onSetBrightness(item.id, brightness)}
            setPower={pwr => this.props.onSetBrightness(item.id, pwr)}
            onPress={_ => this._expandItem(item.id)}
          />
        )}/>
    );
  }
}

DeviceList.propTypes = {
  // list refreshing
  refreshing: PropTypes.bool.isRequired,
  onRefresh: PropTypes.func.isRequired,
  // list fetching
  onEndReached: PropTypes.func.isRequired,
  // device instances
  devices: PropTypes.arrayOf(PropTypes.object).isRequired,
  onSetPower: PropTypes.func.isRequired,
  onSetBrightness: PropTypes.func.isRequired,

}
