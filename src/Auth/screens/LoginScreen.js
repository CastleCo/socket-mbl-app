import React from 'react';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import {
  Container,
  Content,
  H1,
  Button,
  Text,
  Toast,
} from 'native-base';
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';

import { Header, LoginForm, ButtonBlockLink } from '../components';
import { actions } from '../../modules/auth';

export class LoginScreen extends React.Component {
  componentWillReceiveProps(newProps) {
    const error = newProps.formError;
    if (Object.keys(error).length > 0) newProps.showError(error.message);
  }
  render() {
    const { formErrors, awaitingResponse, onLogin, goToForgotPwScreen, goToRegisterScreen } = this.props;
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Content>
          <Header height={256} />
          <LoginForm
            onSubmit={onLogin}
            errors={formErrors}
            disableSubmit={awaitingResponse}
          />
          <ButtonBlockLink onPress={goToForgotPwScreen}>I forgot my password</ButtonBlockLink>
        </Content>
        <ButtonBlockLink onPress={goToRegisterScreen}>I don't have an account</ButtonBlockLink>
      </Container>
    );
  }
}

LoginScreen.propTypes = {
  formErrors: PropTypes.object.isRequired,
  formError: PropTypes.object.isRequired,
  awaitingResponse: PropTypes.bool.isRequired,
  onLogin: PropTypes.func.isRequired,
  goToForgotPwScreen: PropTypes.func.isRequired,
  goToRegisterScreen: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  formErrors: state.auth.form.errors,
  formError: state.auth.form.error,
  awaitingResponse: state.auth.isLoggingIn
});

const mapDispatchToProps = dispatch => {
  return {
    ...bindActionCreators({
    onLogin: form => actions.login(form.email, form.password),
    goToRegisterScreen: _ => NavigationActions.back(),
    goToForgotPwScreen: _ => NavigationActions.navigate({ routeName: 'ForgotPassword' }),
    }, dispatch),
    showError: message => (Toast.show({ text: message, type: "danger" }))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
