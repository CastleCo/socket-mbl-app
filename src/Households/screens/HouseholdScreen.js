import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from "prop-types";
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

class HouseholdScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return { title: "Household" }
  }
  render() {
    return (
      <Container>
        <Content>
          <Text>Household {this.props.householdId}</Text>
          <FlatList>
            <Separator>MEMBERS</Separator>
            <ListItem><Text>See all...</Text></ListItem>
          </FlatList>
        </Content>
      </Container>
    );
  }
};

HouseholdScreen.propTypes = {
  householdId: PropTypes.number.isRequired,
  renameHousehold: PropTypes.func.isRequired,
  // goToMembers: PropTypes.func.isRequired,
  // goToDevices: PropTypes.func.isRequired,
  // goToDeviceGroups: PropTypes.func.isRequired,
}

const mapStateToProps = state = ({

});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    renameHousehold: _ => null,
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HouseholdScreen);
