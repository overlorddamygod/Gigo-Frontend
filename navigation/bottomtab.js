import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import HomeScreen from '../screens/home';
import ListingScreen from '../screens/listing';
import MoreScreen from '../screens/more';
import ScanScreen from '../screens/scan';
import { AntDesign, Feather } from "@expo/vector-icons";
import useUserStore from '../store';

const { Navigator, Screen } = createBottomTabNavigator();

const BottomTabBar = ({ navigation, state }) => {

return (

    <BottomNavigation
      selectedIndex={state.index}
      onSelect={index => navigation.navigate(state.routeNames[index])}>
      <BottomNavigationTab title='Home' icon={() => {
        return <AntDesign name="home" size={24} color="black" />
      }}/>
      {/* <BottomNavigationTab title='Search' icon={<AntDesign name="search1" size={24} color="black" />}/> */}
      <BottomNavigationTab title='Scan' icon={<AntDesign name="qrcode" size={24} color="black" />}/>
      <BottomNavigationTab title='More' icon={<Feather name="more-horizontal" size={24} color="black" />}/>
      {/* <BottomNavigationTab title='ORDERS'/> */}
    </BottomNavigation>
)};

const BottomTabNavigator = () => {
  const user = useUserStore((store) => store);

  return (
    <Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Screen name="Home" component={HomeScreen}/>
      {/* <Screen name={user.role === 'Customer'?'Search Company':'Search Customers'} component={ListingScreen}/> */}
      <Screen name="Scan" component={ScanScreen} options={{unmountOnBlur: true}}/>
      <Screen name="More" component={MoreScreen}/>
      {/* <Screen name='Orders' component={OrdersScreen}/> */}
    </Navigator>
)};

  export default BottomTabNavigator
  