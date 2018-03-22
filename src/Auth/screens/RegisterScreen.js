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

import { registerUser } from "../../actions/auth";
import { Header, RegisterForm } from '../components';

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
          <Header height={192}/>
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
  authenticated: PropTypes.bool,
  formErrors: PropTypes.instanceOf(Map).isRequired,
  onRegister: PropTypes.func.isRequired,
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
