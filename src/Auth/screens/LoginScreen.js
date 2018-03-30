import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import {
  Container,
  Content,
  H1,
  Button,
  Text,
} from 'native-base';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';

import { Header, LoginForm } from '../components';
import { login } from '../../modules/auth/action-creators';

const LoginScreen = (props) => {
  const { formErrors, awaitingResponse, onLogin, goToForgotPwScreen, goBackToLoginScreen } = props;
  return (
    <Container style={{ backgroundColor: "#fff" }}>
      <Content>
        <Header height={256} />
        <LoginForm
          onSubmit={onLogin}
          errors={formErrors}
          disableSubmit={awaitingResponse}
        />
        <Button full transparent onPress={goToForgotPwScreen}>
          <Text>I forgot my password</Text>
        </Button>
      </Content>
      <Button full transparent onPress={goBackToLoginScreen}>
        <Text>I don't have an account</Text>
      </Button>
    </Container>
  );
}

LoginScreen.propTypes = {
  formErrors: PropTypes.object.isRequired,
  awaitingResponse: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  goToForgotPwScreen: PropTypes.func.isRequired,
  goBackToLoginScreen: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  formErrors: state.auth.form.errors,
  awaitingResponse: state.auth.isLoggingIn
});

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onLogin: form => login(form.email, form.password),
    goBackToLoginScreen: _ => NavigationActions.back(),
    goToForgotPwScreen: _ => NavigationActions.navigate({ routeName: 'ForgotPassword' }),
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
