// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation, BottomNavigationTab, Layout, Text } from '@ui-kitten/components';
import HomeScreen from './screens/home';
import MainNavigator from './navigation';
import { AsyncStorage } from 'react-native';
import useUserStore from './store';

import {useEffect} from 'react';
export default () => {
  const setToken = useUserStore((store) => store.setToken)

  useEffect(() => {
    AsyncStorage.getItem('user:token').then((data) => {
      if (data) {
        setToken(data);
      }
    })
  
    return () => {
      
    }
  }, [])
  
  return (
  
  <ApplicationProvider {...eva} theme={{
    ...eva.light,
    ...{
      "color-primary-100": "#C9FBD5",
      "color-primary-200": "#95F8B6",
      "color-primary-300": "#5FEA9B",
      "color-primary-400": "#37D58B",
      "color-primary-500": "#02BA76",
      "color-primary-600": "#019F75",
      "color-primary-700": "#01856F",
      "color-primary-800": "#006B64",
      "color-primary-900": "#005659",
    },
  }}>
    {/* <HomeScreen /> */}
    <NavigationContainer>
      <MainNavigator/>
    </NavigationContainer>
  </ApplicationProvider>
)};