import React from 'react';
import { Switch, Slider } from 'react-native';

import { Container, ListItem, Thumbnail, Body, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

const _SocketListItemExtras = ({ brightness, setBrightness }) => {
  return (
    <Col>
      <Slider
        maximumValue={0}
        maximumValue={100}
        step={1}
        value={brightness}
        onSlidingComplete={v => setBrightness(v)}
      />
    </Col>
  )
}

const _SocketListItem = (props) => {
  const { onPress, setBrightness, setPower, expanded, name, iconUrl, attributes, brightness } = props;
  const isOn = brightness > 0;
  return (
    <ListItem onPress={onPress}>
      <Grid>
        <Row>
          <Thumbnail square small source={{ uri: iconUrl }} />
          <Body>
            <Text>{name}</Text>
          </Body>
          <Right>
            <Switch value={isOn} onValueChange={_ => { setPower(!isOn); } } />
          </Right>
        </Row>
        <Row>
          { expanded && _SocketListItemExtras({ brightness, setBrightness }) }
        </Row>
      </Grid>
    </ListItem>
  )
}

export default class SocketListItem extends React.PureComponent {
  render() {
    return _SocketListItem(this.props);
  }
}
