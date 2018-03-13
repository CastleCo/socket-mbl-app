import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Input from '../native-base-theme/components/Input';

export default class CustomComponent extends Component {
  render() {
    return (
      <TextInput {...props} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  textContent: {
    fontSize: 20,
    color: 'red',
  },
});