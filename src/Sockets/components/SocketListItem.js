import React from 'react';
import { Switch, Slider } from 'react-native';

import { Container, ListItem, Thumbnail, Body, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class SocketListItem extends React.PureComponent {
  render() {
    const isOn = this.props.brightness > 0;
    return (
      <ListItem onPress={this.props.onPress}>
        <Grid>
          <Row>
            <Thumbnail square small source={{ uri : this.props.iconUrl }} />  
            <Body>
              <Text>{this.props.name}</Text>
            </Body>
            <Right>
              <Switch
                value={isOn}
                onValueChange={_ => {
                  this.props.setBrightness(isOn ? 0 : 50);
                }}
              />
            </Right>
          </Row>
          {
            this.props.showSlider && (
              <Row>
                <Col>
                  <Slider
                    maximumValue={0}
                    maximumValue={100}
                    step={1}  
                    value={this.props.brightness}
                    onSlidingComplete={v => this.props.setBrightness(v)}
                  />
                </Col>
              </Row>
            )
          }
        </Grid>
      </ListItem>
    );
  }
}
