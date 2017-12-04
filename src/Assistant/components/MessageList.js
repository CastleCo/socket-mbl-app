import React from 'react';
import { FlatList } from 'react-native';

import { MessageListItem } from '.';

export default class MessageList extends React.PureComponent {
  _keyExtractor = (item, index) => item.id;
  render() {
    const lastIndex = this.props.messages.length - 1;
    return (
      <FlatList
        inverted={true}
        style={{ backgroundColor: "#fff" }}
        data={this.props.messages}
        extraData={this.props}
        keyExtractor={this._keyExtractor}
        onEndReached={this.props.onBottomReached}
        onRefresh={this.props.onTopReached}
        refreshing={this.props.loading}
        renderItem={({ item, index }) => {
          const itemIsFollowing = (
            this.props.messages[(index < lastIndex) ? index + 1 : 0].user.username === item.user.username
          );
          return (<MessageListItem
            continues={itemIsFollowing && index !== lastIndex}
            messageStyle={(item.user.username === "merlin") ? 'assistant' : 'user'}
            username={item.user.username}
            text={item.message}
          />)
        }
      }/>
    );
  }
}
