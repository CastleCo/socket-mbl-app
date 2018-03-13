import React from 'react';
import { View, Image, TextInput } from 'react-native';
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

import { AuthService } from '../../api';
import { PasswordInput } from '../components';

import styles from '../../common/constants/Colors';
const { primaryColor } = styles;

export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);

    var form =  {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
    };

    this.state = {
      showPassword: false,
      form,
      errors: (new Map()),
    }

    // initalize auth service
    this.auth = new AuthService("http://localhost:3000/v1");
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
  _updateFirstName = (firstName) => {
    this.setState({ form: Object.assign(this.state.form, { firstName }) });
  }
  _updateLastName = (lastName) => {
    this.setState({ form: Object.assign(this.state.form, { lastName }) });
  }
  _submitRegister = () => {
    // submit Register information
    this.auth.register(this.state.form.email, this.state.form.password)
      .then((data) => {
        // save auth tokens

        // move into profile creation page
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
    this.props.navigation.navigate("Login");
  }
  _focus = field => this[field]._root.focus()
  render() {
    return (
      <Container style={{ backgroundColor: "#fff"}}>
        <Content>
          <View style={{ alignItems : 'center', justifyContent: 'center', height: 192, marginTop: 32 }}>
            <Image style={{ width: 128, height: 128 }} source={require('../../assets/icons/app-icon.png')} />
            <H1 style={{ fontWeight: "700", color: primaryColor }}>CASTLE</H1>
          </View>
          <Form>
            <Item error={this.state.errors.get('firstName')} stackedLabel>
              <Label style={{ color: "#777" }}>First Name</Label>
              <Input
                placeholder="Malcolm"
                autoCapitalize="words"
                placeholderTextColor="#ccc"
                returnKeyType="next"
                value={this.state.form.firstName}
                onChangeText={this._updateFirstName}
                onSubmitEditing={_ => this._focus("_inputLastName") }
                blurOnSubmit={false}
              />
            </Item>
            <Item error={this.state.errors.get('lastName')} stackedLabel>
              <Label style={{ color: "#777" }}>Last Name</Label>
              <Input
                ref={c => this._inputLastName = c}
                placeholder="Gladwell"
                autoCapitalize="words"
                placeholderTextColor="#ccc"
                returnKeyType="next"
                value={this.state.form.lastName}
                onChangeText={this._updateLastName}
                onSubmitEditing={evt => this._focus("_inputEmail")}
                blurOnSubmit={false}
              />
            </Item>
            <Item error={this.state.errors.get('email')} stackedLabel>
              <Label style={{ color: "#777"}}>Email</Label>
              <Input
                ref={c => this._inputEmail = c}
                placeholder="your.email@website.com"
                autoCapitalize="none"
                placeholderTextColor="#ccc"
                keyboardType="email-address"
                returnKeyType="next"
                value={this.state.form.email}
                onChangeText={this._updateEmail}
                onSubmitEditing={evt => this._focus("_inputPassword")}
                blurOnSubmit={false}
              />
            </Item>
            <Item error={this.state.errors.get('password')} stackedLabel last>
              <Label style={{ color: "#777"}}>Password</Label>
              <PasswordInput
                getRef={c => this._inputPassword = c}
                placeholder="password"
                placeholderTextColor="#ccc"
                value={this.state.form.password}
                onChangeText={this._updatePassword}
                showPassword={this.state.showPassword}
                onTogglePassword={this._togglePasswordVisibility}
                onSubmitEditing={(evt) => (this._submitLogin)}
              />
            </Item>
          </Form>
          <Button block primary style={{ margin: 16 }} onPress={this._submitLogin}>
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
