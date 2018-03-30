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
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";

import { register } from "../../modules/auth/action-creators";
import { Header, RegisterForm } from '../components';

const RegisterScreen = props => {
  const { formErrors, awaitingResponse, onRegister, goToLoginScreen } = props;
  return (
    <Container style={{ backgroundColor: "#fff" }}>
      <Content>
        <Header height={192}/>
        <RegisterForm
          onSubmit={onRegister}
          errors={formErrors}
          disableSubmit={awaitingResponse}
        />
      </Content>
      <Button full transparent onPress={goToLoginScreen}>
        <Text>I already have an account</Text>
      </Button>
    </Container>
  );
}

RegisterScreen.propTypes = {
  formErrors: PropTypes.object.isRequired,
  awaitingResponse: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  goToLoginScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  formErrors: state.auth.form.errors,
  awaitingResponse: state.auth.isLoggingIn,
})

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    onRegister: form => register(form.email, form.password, form.firstName, form.lastName),
    goToLoginScreen: _ => NavigationActions.navigate({ routeName: 'Login' }),
    goBackToLoginScreen: _ => NavigationActions.navigate({ routeName: 'Login' })
  }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
