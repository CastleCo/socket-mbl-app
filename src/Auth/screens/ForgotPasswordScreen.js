import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
import {
  Container,
  Header,
  Title,
  Left,
  Body,
  Right,
  Grid,
  Row,
  Col,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Footer,
  Icon,
  H1
} from 'native-base';

import { PasswordInput } from '../components';

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    var form =  {
      email: "",
    };
    var errors = Object.keys(form).reduce((obj, key) => {
      obj[key] = false; // set all errors false
      return obj;
    }, {});

    this.state = {
      showPassword: false,
      form,
      messages: new Map(),
      errors: new Map(),
    }
  }
  _updateEmail = (email) => {
    this.setState(state => {
      const messages = new Map(state.messages);
      const errors = new Map(state.errors);
      messages.clear('email');
      errors.clear('email');
      return {
        form: Object.assign(state.form, { email }),
        messages,
        errors
      };
    });
  }
  _tryResetPassword = (email) => {
    console.log(`[${(new Date()).toString()}] reset-password email=${email}`);
    // send network request for authentication
    return new Promise((resolve, reject) => {
      // case: empty string
      if (email.trim().length === 0) return reject({ message: "Please enter a valid email." });

      // TODO: case: invalid email string
      // if (email is not formatted correctly) return reject({ message: "Please enter a valid email." });

      setTimeout(() => {
        resolve({ ok: true, message: "If we had an account with that email, we sent an email to reset your password." });
      }, 200);
    });
  }
  _submitResetPassword = () => {
    // submit reset passowrd information
    this._tryResetPassword(this.state.form.email)
      .then((resp) => {
        this.setState((state) => {
          const messages = new Map(state.messages);
          // set errors on
          messages.set('email', resp.message);
          return { messages };
        })
      }, (err) => {
        this.setState((state) => {
          const errors = new Map(state.errors);
          // set errors on
          errors.set('email', err.message);
          return { errors };
        })
      })
  }
  _goToLoginScreen = () => {
    // navigate to Login page
    const user = 'unknown';
    const now = (new Date()).toString();
    console.log(`[${now}] navigate user=${user} screen='Login'`);
    this.props.navigation.goBack();
  }
  render() {
    const isDisabled = (this.state.form.email.length === 0);
    return (
      <Container style={{ backgroundColor: "#fff" }}>
        <Header>
          <Left>
            <Button light transparent onPress={this._goToLoginScreen}>
              <Icon name="arrow-back"/>  
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Reset Password</Title>
          </Body>
          <Right/>
        </Header>  
        <Content>
          <View style={{ padding : 16}}>
            {this.state.errors.get('email') && <Text style={{ textAlign: 'center', color: '#ff0000' }}>{this.state.errors.get('email')}</Text>}
            {this.state.messages.get('email') && <Text style={{ textAlign: 'center' }}>{this.state.messages.get('email')}</Text>}
          </View>
          <Form>
            <Item stackedLabel last error={this.state.errors.get('email') != null}>
              <Label style={{ color: "#777"}}>Email</Label>
              <Input
                placeholder="your.email@website.com"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                autoCapitalize='none'
                value={this.state.form.email}
                onChangeText={this._updateEmail}
                returnKeyType="done"
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={this._submitResetPassword}
              />
            </Item>
          </Form>
          <Button block primary style={{ margin: 16 }} onPress={this._submitResetPassword} disabled={isDisabled}>
            <Text>Send Reset Email</Text>
          </Button>
        </Content>
      </Container>
    )
  }
}
