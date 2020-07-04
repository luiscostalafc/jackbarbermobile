import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/MaterialIcons';

import DashboardCartWoman from '../pages/New/Confirm/DashboardCartWoman';
import Cart from '../pages/New/Cart';



const App = createStackNavigator();

const WomanServices: React.FC = () => (
  <App.Navigator
    screenOptions={{
			title: "Serviços Femininos",
      headerShown: false,
      cardStyle: { backgroundColor: '#C4C4C4' },
		}}
		//  initialRouteName="DashboardCartWoman"

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
      name="DashboardCartWoman"
      component={DashboardCartWoman}
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

export default WomanServices;


