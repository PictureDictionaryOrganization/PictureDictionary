import React from 'react';
import { Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Arama from '../screens/Arama';
import Favoriler from '../screens/Favoriler';
import Profil from '../screens/Profil';
import Duzenle from '../screens/ProfilAyarlari'
import useStatusBar from '../hooks/useStatusBar';
import Colors from '../utils/colors';

const Tab = createBottomTabNavigator();
const drawer=  createDrawerNavigator();
export default function AppStack() {

const home = () =>{

    function AramaPage() {
      useStatusBar('light-content');
      return (<Arama/>);
    }
    function FavorilerPage() {
      useStatusBar('light-content');
      return (<Favoriler/>);
    }
    function ProfilPage() { 
      useStatusBar('light-content');
      return (<Profil/>);
    }
    
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              if (route.name === 'Arama') {
                return (
                  <Ionicons
                    name={focused ? 'ios-search' : 'ios-search'} size={size} color={color} />
                );
              }
              else if (route.name === 'Favoriler') {
                return (
                  <Ionicons
                    name={focused ? 'ios-heart' : 'ios-heart'} size={size} color={color}/>
                );
              }
              else if (route.name === 'Profil') {
                return (
                  <Ionicons
                    name={focused ? 'md-person' : 'md-person'} size={size} color={color}/>
                );
              }
            },
          })}
          tabBarOptions={{
            activeTintColor: Colors.black,
            inactiveTintColor: Colors.inactiveButton,
            activeBackgroundColor: Colors.tabbarBackgroundColor,
            inactiveBackgroundColor: Colors.tabbarBackgroundColor
          }}
        >
          <Tab.Screen name="Arama" component={AramaPage} />
          <Tab.Screen name="Favoriler" component={FavorilerPage} />
          <Tab.Screen name="Profil" component={ProfilPage} />
        </Tab.Navigator>
    );

  }

  return (

      <drawer.Navigator >
          <drawer.Screen name="Home" component={home} />
          <drawer.Screen name="Profil Düzenle" component={Duzenle} />
      </drawer.Navigator>

);
  

}