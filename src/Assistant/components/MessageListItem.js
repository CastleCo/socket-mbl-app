import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'native-base';

import styles from '../../constants/Colors';
const { primaryColor } = styles;

// props
// messageStyle: unstyled, user, assistant, info
export default class Element extends React.PureComponent {
  render() {
    var messageStyle = (this.props.messageStyle === 'user') ? userStyles : assistantStyles;
    return (
      <View style={[genericStyles.messageContainer, messageStyle.alignToSide, (this.props.continues) ? { paddingTop: 4 } : null]}>
        {
          this.props.continues && (
            <View>
              <Text style={{ color: "#aaa", fontSize: 12 }}>{this.props.username}</Text>
            </View>
          )
        }
        <View
          style={[genericStyles.messageBody, messageStyle.messageBody]}>
          <Text style={[messageStyle.messageText]}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const genericStyles = StyleSheet.create({
  messageContainer: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
  },
  messageBody: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ffffff00",
    borderRadius: 8,
    padding: 8,
    maxWidth: "67%",
    overflow: "hidden"
  }
});

const userStyles = StyleSheet.create({
  alignToSide: { alignItems: 'flex-end' },
  messageBody: { backgroundColor: "#ecf0f1", },
  messageText: { color: "#000" }
});

const assistantStyles = StyleSheet.create({
  alignToSide: { alignItems: 'flex-start' },
  messageBody: { backgroundColor: primaryColor, },
  messageText: { color: "#fff" }
});

