import React from "react";
import PropTypes from "prop-types";

import { View, Image } from "react-native";
import { H1 } from "native-base";

import styles from '../../common/constants/Colors';
const { primaryColor } = styles;

export default class Header extends React.PureComponent {
  static defaultProps = {
    height: 192
  }
  render() {
    return (
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: this.props.height,
        marginTop: 32
      }}>
        <Image
          style={{ width: 128, height: 128 }}
          source={require('../../assets/icons/app-icon.png')} />
        <H1 style={{ fontWeight: "700", color: primaryColor }}>CASTLE</H1>
      </View>
    )
  }
}

Header.propTypes = {
  height: PropTypes.number.isRequired
}