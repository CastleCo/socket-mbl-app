import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'native-base';

export default class PasswordInput extends React.PureComponent {
  render() {
    const isEmpty = this.props.value.trim().length === 0;
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Input
          {...this.props}  
          style={{ flex: 1 }}
          autoCorrect={false}
          autoCapitalize='none'
          secureTextEntry={!this.props.showPassword}
          selectTextOnFocus={true}
          clearButtonMode={'always'}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
        />
        {<TouchableOpacity
          transparent
          style={[styles.button]}
          disabled={isEmpty}
          onPress={_ => this.props.onTogglePassword()}>
          <Text style={[styles.buttonText, (!isEmpty) ? styles.buttonTextEnabled : null ]}>{this.props.showPassword ? 'hide' : 'show'}</Text>
        </TouchableOpacity>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  button: { marginRight: 8, width: 48, height: 48, justifyContent: "center" },
  buttonText: { textAlign: "center", fontWeight: "700" ,color: "#00000033" },
  buttonTextEnabled: { color: "#09e" }
})