import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import {
  Container,
  Header,
  Left,
  Button,
  Icon,
  Body,
  Right,
  Content,
  Title,
  Footer,
  Text
} from 'native-base';

import { MessageList, MessageListInput } from '../components';

export default class AssistantScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      hideSubmit: false,
      fetchingMessages: false,
      page: 0,
      countPerPage: 10,
      messages: []
    }

    this._websocket = this._initializeWebsocket("ws://8a4922c1.ngrok.io", "accessToken");
  }
  componentWillMount() {
    this._fetchMessages(this.state.page, this.state.countPerPage);3
  }
  _initializeWebsocket = (url, accessToken) => {
    var ws = new WebSocket(`${url}?access_token=${accessToken}`);
    ws.onmessage = evt => { console.log(evt); };
    return ws;
  }
  _fetchMessages = (page, count) => {
    // emulate network req
    this.setState({ fetchingMessages: true });
    setTimeout(() => {
      this.setState({
        messages: require('./messages.json').slice(0, (page + 1) * count),
        fetchingMessages: false
      });
    }, 200)
  };
  _incrementPageCount = () => {
    this.setState({ page: this.state.page + 1 });
    this._fetchMessages(this.state.page + 1, this.state.countPerPage);
  }
  _decrementPageCount = () => {
    if (this.state.page > 0) {
      this.setState({ page: this.state.page - 1 });
      this._fetchMessages(this.state.page - 1, this.state.countPerPage);
    }
  }
  _hideSubmit = _ => { this.setState({ hideSubmit: true }); }
  _showSubmit = _ => { this.setState({ hideSubmit: false }); }
  _typeInput = (text) => { this.setState({ text }); }
  _submitInput = (text) => {
    console.log(text);
    // send message

    // append to body
    var newMessage = [{
      id: this.state.messages[this.state.messages.length - 1].id + "5",
      user: { username: 'user' },
      message: text
    }]; 
    this.setState({ messages: newMessage.concat(this.state.messages) });

    // clear field
    this.setState({ text: "" });
  }
  _toggleDrawer = () => {
    this.props.navigation.navigate('DrawerToggle');
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent light onPress={this._toggleDrawer}>
              <Icon ios="ios-menu" name="md-menu" />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>Merlin</Title>  
          </Body>
          <Right/>
        </Header>
        <MessageList
          messages={this.state.messages}
        />
        <KeyboardAvoidingView behavior="padding">
          <Footer>
            <MessageListInput
              value={this.state.text}
              onFocus={this._hideSubmit}
              onBlur={this._showSubmit}
              hideSubmit={this.state.hideSubmit}
              onChangeText={this._typeInput}
              onSubmitText={this._submitInput}
            />
          </Footer>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}
