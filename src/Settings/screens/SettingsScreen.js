import React from 'react';
import { Alert } from 'react-native';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import {
  Container,
  Content,
  Button,
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
          <Button transparent light onPress={params.openDrawer}>
            <Icon name="menu" />
          </Button>
        )
      }
    }
  componentWillMount() {
    // Link the openDrawer fn to the header button
    this.props.navigation.setParams({
      openDrawer: () => this.props.navigation.navigate('DrawerOpen')
    });
  }
  _tapLogout = () => {
    const buttons = [
      { text: 'Logout', onPress: this.props.logout },
      { text: 'Stay logged in', style: 'cancel' }
    ];
    Alert.alert(
      'Logout?',
      'Are you sure you want to log out of Castle?',
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
            <ListItem onPress={this.props.goToLinks}><Text>See Links</Text></ListItem>
          </List>
        </Content>
      </Container>
    );
  }
};

const mapDispatchToProps = dispatch => ({
  logout: _ => dispatch(logout()),
  goToConfig: _ => dispatch(NavigationActions.navigate({ routeName: 'Config' })),
  goToLinks: _ => dispatch(NavigationActions.navigate({ routeName: 'Links' }))
});

export default connect(null, mapDispatchToProps)(SettingsScreen);
