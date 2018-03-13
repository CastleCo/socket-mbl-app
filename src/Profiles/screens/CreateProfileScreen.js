import React from 'react';
import { View, TouchableHighlight, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
import styles from '../../constants/Colors';

const { primaryColor } = styles;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    var form =  {
      email: "",
      password: ""
    };

    this.state = {
      showPassword: false,
      form,
      errors: (new Map()),
    }
  }
  _togglePasswordVisibility = _ => { this.setState({ showPassword: !this.state.showPassword }); }
  _updatePassword = (password) => {
    this.setState({
      form: Object.assign(this.state.form, { password })
    });
  }
  _updateEmail = (email) => {
    this.setState({ form: Object.assign(this.state.form, { email }) });
  }
  _tryRegister = (email, pw) => {
    const now = (new Date()).toString();
    console.log(`[${now}] register email=${email} password=${pw}`);
    // send network request for authentication
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email !== 'admin' && pw !== "admin") return reject({ message: "Sorry" });

        // nav to main
      }, 200);
    });
  }
  _submitRegister = () => {
    // submit Register information
    this._tryRegister(this.state.form.email, this.state.form.password)
      .then((data) => {
        // save auth session

        // move into register-2
        const action = NavigationActions.reset({
          index: 0,
          key: null,
          actions: [NavigationActions.navigate({ routeName: 'App' })]
        });
        this.props.navigation.dispatch(action);
      }, (err) => {
        this.setState((state) => {
          const errors = new Map(state.errors);
          // set errors on
          errors.set('email', true);
          errors.set('password', true);
          return { errors };
        })
      })
  }
  _goToLoginScreen = () => {
    // navigate to Login page
    const now = (new Date()).toString();
    console.log(`[${now}] navigate-back screen='Login'`);
    this.props.navigation.goBack();
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#fff"}}>
        <Content>
          <View style={{ alignItems : 'center', justifyContent: 'center', height: 256, marginTop: 32 }}>
            <Image style={{ width: 128, height: 128 }} source={require('../../assets/icons/app-icon.png')} />
            <H1 style={{ fontWeight: "700", color: primaryColor }}>CASTLE</H1>
          </View>
          <Form>
            <Item error={this.state.errors.get('firstName')} stackedLabel>
              <Label style={{ color: "#777" }}>First Name</Label>
              <Input
                placeholder="Malcolm"
                autoCapitalize={true}
                placeholderTextColor="#ccc"
                value={this.state.form.firstName}
                onChangeText={this._updateFirstName}
              />
            </Item>
            <Item error={this.state.errors.get('lastName')} stackedLabel>
              <Label style={{ color: "#777" }}>Last Name</Label>
              <Input
                placeholder="Gladwell"
                autoCapitalize="none"
                placeholderTextColor="#ccc"
                value={this.state.form.lastName}
                onChangeText={this._updateLastName}
              />
            </Item>
          </Form>
          <Button block dark style={{ backgroundColor: primaryColor, margin: 16 }} onPress={this._submitLogin}>
            <Text>Register</Text>
          </Button>
        </Content>
        <View>
          <Button full transparent dark onPress={this._goToLoginScreen}>
            <Text style={{ color: primaryColor }}>I already have an account</Text>
          </Button>  
        </View>  
      </Container>
    )
  }
}
