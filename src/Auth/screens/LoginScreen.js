import React from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import { View, Image } from 'react-native';
import {
  Container,
  Content,
  H1,
  Button,
  Text,
} from 'native-base';

import { Header, LoginForm } from '../components';
import { loginUser } from '../../actions/auth';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
  }
  componentWillReceiveProps(newProps) {
    if (newProps.authenticated) return this._goToMainScreen()
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
  _goToForgotPwScreen = () => {
    // TODO: replace once RN-navigation is also handled by redux
    // navigate to forgot pw page
    this.props.navigation.navigate('ForgotPassword');
  }
  _goToRegisterScreen = () => {
    // TODO: replace once RN-navigation is also handled by redux
    // navigate to register page
    // this.props.navigation.navigate('Register');
    this.props.navigation.goBack()
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#fff"}}>
        <Content>
          <Header height={256} />
          <LoginForm
            onSubmit={this.props.onLogin}  
            errors={this.props.formErrors}
          />
          <Button full transparent onPress={this._goToForgotPwScreen}>
            <Text>I forgot my password</Text>
          </Button>
        </Content>
        <Button full transparent onPress={this._goToRegisterScreen}>
          <Text>I don't have an account</Text>
        </Button>
      </Container>
    )
  }
}

LoginScreen.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  formErrors: PropTypes.instanceOf(Map).isRequired,
  onLogin: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  authenticated: state.authenticated,
  formErrors: state.formErrors || new Map()
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: ({ email, password }) => {
    dispatch(loginUser(email, password));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
