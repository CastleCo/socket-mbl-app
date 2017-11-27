import React from 'react';
import {
  View,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Left,
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

    this.state = {
      showPassword: false,
      form: {
        email: "",
        password: ""
      }
    }
  }
  _togglePasswordVisibility = _ => { this.setState({ showPassword: !this.state.showPassword }); }
  _updatePassword = (password) => {
    this.setState({ form: Object.assign(this.state.form, { password }) });
  }
  _updateEmail = (email) => {
    this.setState({ form: Object.assign(this.state.form, { email }) });
  }
  _tryLogin = (email, pw) => {
    // send network request for authentication
  }
  _submitLogin = () => {
    // submit login information
  }
  _goToForgotPwScreen = () => {
    // navigate tot forgot pw page
  }
  _goToRegisterScreen = () => {
    // navigate to register page
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#fff"}}>
        <Content>
          <View style={{ alignItems : 'center', justifyContent: 'center', height: 256, marginTop: 32 }}>
            <Image style={{ width: 128, height: 128 }} source={require('../../assets/icons/app-icon.png')} />
            <H1 style={{ fontWeight: "700", color: "#00c29a" }}>CASTLE</H1>
          </View>
          <Form>
            <Item stackedLabel>
              <Label style={{ color: "#777"}}>Email</Label>
              <Input
                placeholder="your.email@website.com"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                value={this.state.form.email}
                onChangeText={this._updateEmail}
              />
            </Item>
            <Item stackedLabel last>
              <Label style={{ color: "#777"}}>Password</Label>
              <PasswordInput
                placeholder="password"
                placeholderTextColor="#ccc"
                value={this.state.form.password}
                onChangeText={this._updatePassword}
                showPassword={this.state.showPassword}
                onTogglePassword={this._togglePasswordVisibility}
              />
            </Item>
          </Form>
          <Button block dark style={{ margin: 16 }} onPress={this._submitLogin}>
            <Text>Login</Text>
          </Button>
          <Button full transparent dark onPress={this._goToForgotPwScreen}>
            <Text>I forgot my password</Text>
          </Button>
        </Content>
        <View>
          <Button full transparent dark onPress={this._goToRegisterScreen}>
            <Text>I don't have an account</Text>
          </Button>  
        </View>  
      </Container>
    )
  }
}
