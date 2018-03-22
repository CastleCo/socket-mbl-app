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

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    const form = {
      firstName: "Joshua Paul",
      lastName: "Chan",
      email: "joshpaulchan@gmail.com",
      password: "lmao",
    };

    this.state = {
      showPassword: false,
      form,
      awaitingResponse: false,
    }
  }
  componentWillReceiveProps(newProps) {
    // reset form button
    this.setState({ awaitingResponse: false });
  }
  _focus = field => this[field]._root.focus()
  _togglePasswordVisibility = _ => {
    this.setState({ showPassword: !this.state.showPassword });
  }
  _updatePassword = password => {
    this.setState({ form: Object.assign(this.state.form, { password }) });
  }
  _updateEmail = email => {
    this.setState({ form: Object.assign(this.state.form, { email }) });
  }
  _submitForm = _ => {
    if (this.state.awaitingResponse) return;
    this.setState({ awaitingResponse: true });
    this.props.onSubmit(this.state.form)
  }
  render() {
    return (
      <Form>
        <Item error={this.props.errors.get('email')} stackedLabel>
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
        <Item error={this.props.errors.get('password')} stackedLabel last>
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
        <Button block primary style={{ margin: 16 }} onPress={this._submitForm} disabled={this.state.awaitingResponse}>
          <Text>Login</Text>
        </Button>
      </Form>
    )
  }
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  errors: PropTypes.instanceOf(Map).isRequired
}