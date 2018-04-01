import React from 'react';
import PropTypes from "prop-types";
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

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";

import { DeviceList } from '../components';
import { getMoreDevices } from '../../modules/devices/action-creators';

const INITIAL_FETCH_AMOUNT = 30; // number of devices to fetch upon page load
const FETCH_AMOUNT = 15; // number of devices to fetch upon end of page reached

class DeviceListPage extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Appliances',
    drawerIcon: ({ tintColor }) => <Icon name="home" color={tintColor}/>,
  }
  // componentWillMount() {
  //   if (this.props.devices.length === 0) {
  //     this.props.getMoreDevices(INITIAL_FETCH_AMOUNT, this.props.numDevices);
  //   }
  // }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={this.props.toggleDrawer}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>Appliances</Title>
          </Body>
          <Right>
            {/* <Button transparent>
              <Icon name="add" />
            </Button> */}
          </Right>
        </Header>
        <DeviceList
          devices={this.props.devices}
          // onRefresh={this.props.refreshDeviceList}
          // refreshing={this.props.isRefreshingDeviceList}
          onEndReached={_ => {
            this.props.getMoreDevices(FETCH_AMOUNT, this.props.numDevices)
          }}
          onSetBrightness={this.props.setDeviceBrightness}
          onSetPower={this.props.setDevicePower}
        />
      </Container>
    );
  }
}

DeviceListPage.propTypes = {
  toggleDrawer: PropTypes.func.isRequired,
  devices: PropTypes.array.isRequired,
  isRefreshingDeviceList: PropTypes.bool.isRequired,
  refreshDeviceList: PropTypes.func.isRequired,
  getMoreDevices: PropTypes.func.isRequired,
  setDeviceBrightness: PropTypes.func.isRequired,
  setDevicePower: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices.devices,
  numDevices: state.devices.numDevices,
  isRefreshingDeviceList: false,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    toggleDrawer: _ => NavigationActions.navigate({ routeName: 'DrawerToggle' }),
    getMoreDevices,
    refreshDeviceList: _ => null, // TODO
    setDeviceBrightness: deviceId => null,  // TODO
    setDevicePower: deviceId => null, // TODO
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(DeviceListPage);
