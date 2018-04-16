import React from 'react';
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { NavigationActions } from 'react-navigation';
import { View, FlatList } from "react-native";
import {
  Container,
  Content,
  Button,
  Icon,
  ListItem,
  SwipeRow,
  Left,
  Body,
  Right,
  Radio,
  Text
} from 'native-base';
import { GenericHeader } from '../../common/components';

import { getMoreHouseholds, setActiveHousehold } from '../../modules/households/action-creators';


console.log(getMoreHouseholds);

const INITIAL_FETCH_AMOUNT = 3;

class HouseholdListItem extends React.PureComponent {
  render() {
    const { household, selected, onSelect } = this.props;
    return (
      <SwipeRow
        icon  
        rightOpenValue={-75}
        body={
          <View style={{ flexDirection: 'row', alignItems: 'center'}}>
            <Body>
              <Text style={{ fontWeight: (selected) ? 'bold' : 'normal' }}>{household.name}
              </Text>
            </Body>
            <Right>
              <Radio selected={selected} />
            </Right>
          </View>
        }

        right={
          <Button info disabled={selected} onPress={_ => onSelect(household.id)}>
            <Icon active name="eye"/>
          </Button>
        }
      />
    )
  }
}

HouseholdListItem.propTypes = {
  household: PropTypes.shape({
    id: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
}

class HouseholdListScreen extends React.Component {
  componentWillMount() {
    const { numHouseholds, getMoreHouseholds } = this.props;
    if (numHouseholds === 0) {
      getMoreHouseholds(INITIAL_FETCH_AMOUNT, numHouseholds);
    }
  }
  render() {
    const { toggleDrawer, households, activeHouseholdId, setActiveHousehold } = this.props;
    return (
      <Container>
        <GenericHeader
          title="Households"
          left={
            <Button transparent onPress={toggleDrawer}>
              <Icon name="menu" />
            </Button>
          }
        // right={
        //   <Button transparent>
        //     <Icon name="add" />
        //   </Button>
        // }
        />
        <Content>
          <FlatList
            style={{ backgroundColor: "#fff" }}
            data={households}
            keyExtractor={ item => item.id }
            renderItem={({ item }) => {
              return (<HouseholdListItem
                household={item}
                selected={activeHouseholdId === item.id}
                onSelect={setActiveHousehold}
              />
              );
            }
              }>
          </FlatList>
        </Content>
      </Container>
    );
  }
};

HouseholdListScreen.propTypes = {
  households: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired
    })
  ).isRequired,
  numHouseholds: PropTypes.number.isRequired,
  
  // loading
  getMoreHouseholds: PropTypes.func.isRequired,
  isLoadingHouseholds: PropTypes.bool.isRequired,
  failedToLoadHouseholds: PropTypes.bool.isRequired,

  // refreshing
  // refreshHouseholds: PropTypes.func.isRequired,
  // isRefreshing: Proptypes.bool.isRequired,

  // active household
  activeHousehold: PropTypes.any,
  setActiveHousehold: PropTypes.func.isRequired,

  // goToHousehold: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  households: state.households.households,
  numHouseholds: state.households.numHouseholds,

  // loading
  isLoadingHouseholds: state.households.isLoading,
  failedToLoadHouseholds: state.households.failedToLoad,

  // refreshing

  // selecting active household
  activeHouseholdId: state.households.activeHouseholdId,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators({
    getMoreHouseholds,
    // refreshHouseholds: _ => null,
    toggleDrawer: _ => NavigationActions.navigate({ routeName: 'DrawerToggle' }),
    setActiveHousehold,
    goToHousehold: householdId => NavigationActions.navigate({ routeName: 'Household' }),
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(HouseholdListScreen);
