import React from "react";
import PropTypes from "prop-types";
import { StatusBar } from "react-native";
import { Header, Left, Body, Title, Subtitle, Right } from "native-base";

export default class GenericHeader extends React.PureComponent {
  render() {
    const { title, subtitle, left, right } = this.props;
    return (
      <Header>
        <StatusBar barStyle="light-content"/>
        <Left>
          {left}
        </Left>
        <Body>
          <Title>{title}</Title>
          {(subtitle) ? <Subtitle>{subtitle}</Subtitle> : null}
        </Body>
        <Right>
          {right}
        </Right>
      </Header>
    )
  }
}

GenericHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  left: PropTypes.element,
  right: PropTypes.element
}