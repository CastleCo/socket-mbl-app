import React from 'react';
import { Slider } from 'react-native';

import { Container, ListItem, Text } from 'native-base';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class SocketListItem extends React.Component {
  state = {
    showSlider : false
  }
  constructor(props) {
    super(props);
    this._toggleSlider = this._toggleSlider.bind(this);
    this._setBrightness = this._setBrightness.bind(this);
  }
  _setBrightness(newBrightness) {
    console.log(`Set socket:${this.props.name} to brightness:${newBrightness}`);
  }
  _toggleSlider() {
    this.setState({ showSlider : !this.state.showSlider });
  }
  render() {
    return (
      <ListItem onPress={this._toggleSlider}>
        <Grid>
          <Row>
            <Text>{this.props.name}</Text>
          </Row>
          {
            this.state.showSlider && (
              <Row>
                <Col>
                  <Slider minimumTrackTintColor='#f1c40f' onSlidingComplete={this._setBrightness.bind(this)}
                  maximumValue={100}
                  step={5}
                  value={this.props.initialBrightness || 50}
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
