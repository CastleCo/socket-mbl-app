import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  Item,
  Label,
  Input,
  Button,
  Text
} from "native-base";

import { PasswordInput } from ".";

export default class RegisterForm extends React.Component {
  constructor(props) {
    super(props);

    const form = {
      firstName: "Joshua Paul",
      lastName: "Chan",
      email: "joshpaulchan@gmail.com",
      password: "lmao",
    };

    this.state = { showPassword: false, form };
  }
  _focus = field => this[field]._root.focus()
  _togglePasswordVisibility = _ => {
    this.setState({ showPassword: !this.state.showPassword });
  }
  _updatePassword = password => {
    this.setState({ form: { ...this.state.form, password } });
  }
  _updateEmail = email => {
    this.setState({ form: { ...this.state.form, email } });
  }
  _updateFirstName = firstName => {
    this.setState({ form: { ...this.state.form, firstName } });
  }
  _updateLastName = lastName => {
    this.setState({ form: { ...this.state.form, lastName } });
  }
  _submitForm = _ => {
    if (this.props.disableSubmit) return;
    this.props.onSubmit(this.state.form);
  }
  render() {
    return (
      <Form>
        <Item error={this.props.errors.hasOwnProperty('firstName')} stackedLabel>
          <Label style={{ color: "#777" }}>First Name</Label>
          <Input
            placeholder="Malcolm"
            autoCapitalize="words"
            placeholderTextColor="#ccc"
            returnKeyType="next"
            value={this.state.form.firstName}
            onChangeText={this._updateFirstName}
            onSubmitEditing={_ => this._focus("_inputLastName")}
            blurOnSubmit={false}
          />
        </Item>
        <Item error={this.props.errors.hasOwnProperty('lastName')} stackedLabel>
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
        <Item error={this.props.errors.hasOwnProperty('email')} stackedLabel>
          <Label style={{ color: "#777" }}>Email</Label>
          <Input
            ref={c => this._inputEmail = c}
            placeholder="your@email.com"
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
        <Item error={this.props.errors.hasOwnProperty('password')} stackedLabel last>
          <Label style={{ color: "#777" }}>Password</Label>
          <PasswordInput
            getRef={c => this._inputPassword = c}
            placeholder="password"
            placeholderTextColor="#ccc"
            value={this.state.form.password}
            onChangeText={this._updatePassword}
            showPassword={this.state.showPassword}
            onTogglePassword={this._togglePasswordVisibility}
            onSubmitEditing={this._submitForm}
          />
        </Item>
        <Button block primary style={{ margin: 16 }} onPress={this._submitForm} disabled={this.props.disableSubmit}>
          <Text>Register</Text>
        </Button>
      </Form>
    )
  }
}

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  disableSubmit: PropTypes.bool.isRequired
}