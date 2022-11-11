import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import HomeScreen from '../screens/home';
import MoreScreen from '../screens/more';
import ScanScreen from '../screens/scan';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='Home'/>
      <BottomNavigationTab title='Scan'/>
      <BottomNavigationTab title='More'/>   
      {/* <BottomNavigationTab title='ORDERS'/> */}
    </BottomNavigation>
);

const BottomTabNavigator = () => (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeScreen}/>
      <Screen name="Scan" component={ScanScreen}/>
      <Screen name="More" component={MoreScreen}/>
      {/* <Screen name='Orders' component={OrdersScreen}/> */}
    </Navigator>
  );

  export default BottomTabNavigator
  