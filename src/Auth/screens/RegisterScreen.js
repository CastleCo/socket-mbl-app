import React from 'react';
import PropTypes from "prop-types";
import { View, Image } from 'react-native';
import {
  Container,
  Content,
  H1,
  Button,
  Text,
} from 'native-base';
import { NavigationActions } from "react-navigation";
import { connect } from "react-redux";


// import { AuthService } from '../../api';
import { registerUser } from "../../actions/auth";
import { RegisterForm } from '../components';

import styles from '../../common/constants/Colors';
const { primaryColor } = styles;

class RegisterScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.authenticated) this._goToMainScreen();
  }
  _goToMainScreen = () => {
    // TODO: replace once RN-navigation is also handled by redux
    // upon sucessful register, move them into app
    const action = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [NavigationActions.navigate({ routeName: 'App' })]
    });
    this.props.navigation.dispatch(action);
  }
  _goToLoginScreen = () => {
    // TODO: replace once RN-navigation is also handled by redux
    // navigate to Login page
    this.props.navigation.navigate("Login");
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Content>
          <View style={{ alignItems: 'center', justifyContent: 'center', height: 192, marginTop: 32 }}>
            <Image style={{ width: 128, height: 128 }} source={require('../../assets/icons/app-icon.png')} />
            <H1 style={{ fontWeight: "700", color: primaryColor }}>CASTLE</H1>
          </View>
          <RegisterForm
            onSubmit={this.props.onRegister}
            errors={this.props.formErrors} />
        </Content>
        <Button full transparent onPress={this._goToLoginScreen}>
          <Text>I already have an account</Text>
        </Button>
      </Container>
    );
  }
}

RegisterScreen.propTypes = {
  onRegister: PropTypes.func.isRequired,
  formErrors: PropTypes.instanceOf(Map)
};

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  formErrors: state.formErrors || new Map()
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: ({email, password, firstName, lastName}) => {
    dispatch(registerUser(email, password, firstName, lastName));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps  
)(RegisterScreen)
