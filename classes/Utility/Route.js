import React from 'react';

import {createStackNavigator, createDrawerNavigator, createAppContainer} from 'react-navigation';

import { Icon } from 'react-native-elements';

import CommunicationScreen from '../screens/CommunicationScreen';
import PollScreen from '../screens/PollScreen';
import PollDetailsScreen from '../screens/PollDetailsScreen';
import LoginScreen from '../screens/LoginScreen';

import translate from '../Utility/Languages';

const CommunicationStack = createStackNavigator(
  {
    CommunicationHome: CommunicationScreen,
  }
);

const PollStack = createStackNavigator(
  {
    PollHome: PollScreen,
    PollDetails: PollDetailsScreen,
  }
);

const AuthStack = createStackNavigator(
  {
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Login',
  }
);

const MainFlow = createDrawerNavigator(
  {
    Communication: {
      screen: CommunicationStack,
      navigationOptions: {
        drawerLabel: translate('COMMUNICATION_title'),
        drawerIcon: ({ tintColor }) => (
          <Icon name="email" color={tintColor} type='material-community'/>
        ),
      },
    },
    Poll: {
      screen: PollStack,
      navigationOptions: {
        drawerLabel: translate('POLL_title'),
        drawerIcon: ({ tintColor }) => (
          <Icon name="pencil" color={tintColor} type='material-community' />
        ),
      }
    }
  },
  {
    initialRouteName: 'Communication',
  }
);

const Route = createStackNavigator(
  {
    Home: MainFlow,
    Auth: AuthStack
  },
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },
    initialRouteName: 'Auth',
  }
);

const AppContainer = createAppContainer(Route);

export default AppContainer;
