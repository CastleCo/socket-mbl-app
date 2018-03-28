import React from 'react';
import { Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';
import {
    Container,
    Header,
    Left,
    Button,
    Icon,
    Body,
    Title,
    Subtitle,
    Right,
    Content,
    List,
    ListItem,
    Separator,
    Text
} from 'native-base';

import { AuthService } from '../../api';

export default class Screen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const params = navigation.state.params || {};
        return {
            title: "Settings",
            headerLeft: (
                <Button transparent light onPress={params.openDrawer}>
                    <Icon name="menu" />
                </Button>
            )
        }
    }
    constructor(props) {
        super(props);

        this.state = {
            errors: new Map()
        }

    }
    componentWillMount() {
        // Link the openDrawer fn to the header button
        this.props.navigation.setParams({
            openDrawer: () => this.props.navigation.navigate('DrawerOpen')
        });
    }
    _tryLogout = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({ ok: true });
            }, 200);
        });
    }
    _submitLogout = () => {
        // confirm, then submit logout
        this.auth.logout()
            .then((data) => {
                // move into app
                const action = NavigationActions.reset({
                    index: 0,
                    key: null,
                    actions: [NavigationActions.navigate({ routeName: 'Auth' })]
                });
                this.props.navigation.dispatch(action);
            }, (err) => {
                this.setState((state) => {
                    const errors = new Map(state.errors);
                    // set errors on
                    return { errors };
                })
            })
    }
    _tapLogout = () => {
        const buttons = [
            { text: 'Logout', onPress: this._submitLogout },
            { text: 'Stay logged in', style: 'cancel' }
        ]
        Alert.alert(
            'Logout?',
            'Are you sure you want to log out of Castle?',
            buttons
        )
    }
    render() {
        return (
            <Container>
                <Content>
                    <List style={{ backgroundColor: "#fff" }}>
                        <Separator bordered><Text>USER ACTIONS</Text></Separator>
                        <ListItem onPress={this._tapLogout}><Text>Log Out</Text></ListItem>
                        <Separator bordered><Text>EXPO</Text></Separator>
                        <ListItem onPress={_ => this.props.navigation.navigate('Config')}><Text>See Config </Text></ListItem>
                        <ListItem onPress={_ => this.props.navigation.navigate('Links')}><Text>See Links</Text></ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}
