import React from 'react';
import { View, TextInput } from 'react-native';
import { Content, Left, Body, Right, Item, Input, Button, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

// Prevens submission if empty
export default (props) => {
  return (
    <View style={{ flex: 1, flexDirection: "row", padding: 8 }}>
      <Item style={{ flex: 1 }}>
        <Input
          type="default"
          placeholder="Say something..."
          returnKeyType="send"
          enablesReturnKeyAutomatically={true}
          blurOnSubmit={true}
          value={props.value}
          onFocus={props.onFocus}
          onBlur={props.onBlur}
          onChangeText={props.onChangeText}
          onSubmitEditing={evt => (props.onSubmitText(props.value))}
        />
      </Item>
      {
        (props.hideSubmit || false) ?
          null : (<Button
            small
            style={{ height: "100%", marginLeft: 8 }}
            onPress={evt => (props.onSubmitText(props.value))}
            disabled={(props.value.trim().length === 0) ? true : false}>
            <Text>{props.submitText || "Say"}</Text>
          </Button>)
      }
    </View>
  );
}
