import React from 'react';
import PropTypes from "prop-types";
import { Alert } from 'react-native';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Button,
  Icon,
  List,
  Separator,
  ListItem,
  Text
} from 'native-base';

import { logout } from "../../modules/auth/action-creators";

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: "Settings",
      headerLeft: (
        <Button transparent light onPress={_ => navigation.navigate('DrawerToggle')}>
          <Icon name="menu" />
        </Button>
      )
    }
  }
  _tapLogout = () => {
    const buttons = [
      { text: 'Yes', onPress: this.props.logout },
      { text: 'Cancel', style: 'cancel' }
    ];
    Alert.alert(
      'Logout',
      'Are you sure you want to log out?',
      buttons
    )
  }
  render() {
    return (
      <Container>
        <Content>
          <List style={{ backgroundColor: "#fff" }}>
            <Separator bordered><Text>USER ACTIONS</Text></Separator>
            <ListItem onPress={this._tapLogout}><Text>Log Out</Text></ListItem>
            <Separator bordered><Text>EXPO</Text></Separator>
            <ListItem onPress={this.props.goToConfig}><Text>See Config </Text></ListItem>
          </List>
        </Content>
      </Container>
    );
  }
};

SettingsScreen.propTypes = {
  logout: PropTypes.func.isRequired,
  goToConfig: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    logout: _ => logout(),
    goToConfig: _ => NavigationActions.navigate({ routeName: 'Config' }),
  }, dispatch)
);

export default connect(null, mapDispatchToProps)(SettingsScreen);
