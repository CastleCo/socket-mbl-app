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

import { register } from "../../modules/auth/action-creators";
import { Header, RegisterForm } from '../components';

const RegisterScreen = props => {
  const { onRegister, formErrors, awaitingResponse, goToLoginScreen } = props;
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
  formErrors: PropTypes.instanceOf(Map).isRequired,
  awaitingResponse: PropTypes.bool.isRequired,
  onRegister: PropTypes.func.isRequired,
  goToLoginScreen: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  formErrors: state.auth.form.errors || new Map(),
  awaitingResponse: state.auth.isLoggingIn,
})

const mapDispatchToProps = dispatch => ({
  onRegister: ({email, password, firstName, lastName}) => {
    dispatch(register(email, password, firstName, lastName));
  },
  goToLoginScreen: _ =>
    dispatch(NavigationActions.navigate({ routeName: 'Login' })),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)
