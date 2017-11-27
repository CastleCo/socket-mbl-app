import React from 'react';
import { Switch, Slider } from 'react-native';

import { Container, ListItem, Thumbnail, Body, Right, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class SocketListItem extends React.PureComponent {
  render() {
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
                onTintColor="#f1c40f"
                value={this.props.brightness > 0}
                onValueChange={_ => {
                  this.props.setBrightness((this.props.brightness > 0) ? 0 : 50, true);
                }}/>
            </Right>
          </Row>
          {
            this.props.showSlider && (
              <Row>
                <Col>
                  <Slider
                  minimumTrackTintColor='#f1c40f'
                  maximumValue={0}
                  maximumValue={100}
                  step={5}
                  value={this.props.brightness}
                  onSlidingComplete={v => this.props.setBrightness(v, true)}
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
