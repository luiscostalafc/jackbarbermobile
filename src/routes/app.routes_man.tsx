import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

//import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/MaterialIcons';
import DashboardCartMan from '../pages/New/Confirm/DashboardCartMan';
import CartMen from '../pages/New/CartMan';



const App = createStackNavigator();

const ManServices: React.FC = () => (
  <App.Navigator
    screenOptions={{
			title: "Serviços Masculinos",
      headerShown: false,
      cardStyle: { backgroundColor: '#C4C4C4' },
		}}
		// initialRouteName="DashboardCartMan"

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
      name="DashboardCartMan"
      component={DashboardCartMan}
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
      component={CartMen}
    />
  </App.Navigator>
);

export default ManServices;


