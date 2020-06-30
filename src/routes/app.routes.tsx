import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/MaterialIcons';

import DashboardCart from '../pages/New/DashboardCart';
import Cart from '../pages/New/Cart';
import { nominalTypeHack } from 'prop-types';


const App = createStackNavigator();

const Serviços: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
		initialRouteName="DashboardCart"
  >
    <App.Screen
      options={{
				headerShown: false,
				headerTransparent: false,
				headerLeftContainerStyle: {
          marginLeft: 20,
				},

				headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />

      }}
      name="Serviços"
      component={DashboardCart}
    />
    <App.Screen
      options={{
				headerTransparent: false,
				headerBackTitleVisible: false,
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default Serviços;


