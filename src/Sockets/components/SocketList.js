import React from 'react';
import { ListView } from 'react-native';
import { Container, Header, Content, List, ListItem, Text } from 'native-base';

import SocketListItem from './SocketListItem';

export default class SocketList extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({
      rowHasChanged : (r1, r2) => r1.name !== r2.name
    });
    this.state = {
      sockets : props.sockets,
      ds : this.ds.cloneWithRows(props.sockets)
    };
  }
  deleteRow(secId, rowId, rowMap) {
    rowMap[`${secId}${rowId}`].props.closeRow();
    const sockets = sockets.filter((skt, i) => i !== rowId);
    this.setState({ sockets });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.sockets) {
      this.setState({
        sockets : nextProps.sockets,
        ds : this.ds.cloneWithRows(nextProps.sockets)
      });
    }
  }
  render() {
    return (
      <List
        initialListSize={10}
        pageSize={10}
        dataArray={this.state.sockets}
        renderRow={socket => <SocketListItem name={socket.name}/> }>
      </List>
    );
  }
}
