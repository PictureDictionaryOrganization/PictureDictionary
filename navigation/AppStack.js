import React from 'react';
import { Ionicons} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as firebase from 'firebase';
import Login from '../screens/LoginScreen'
import Arama from '../screens/Arama';
import Favoriler from '../screens/Favoriler';
import Profil from '../screens/Profil';
import Duzenle from '../screens/ProfilAyarlari'
import useStatusBar from '../hooks/useStatusBar';
import Colors from '../utils/colors';

const Tab = createBottomTabNavigator();
const drawer=  createDrawerNavigator();
export default function AppStack({navigation}) {

  function handleSignOut() {
    firebase.auth().signOut();
    return(<Login/>);
  }

  const home = ({navigation}) =>{

      function AramaPage() {
        return (<Arama navigation={navigation}/>);
      }
      function FavorilerPage() {
        return (<Favoriler navigation={navigation}/>);
      }
      function ProfilPage() { 
        return (<Profil navigation={navigation}/>);
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
            <drawer.Screen name="Ana Sayfa" component={home} navigation={navigation} />
            <drawer.Screen name="Profil Düzenle" component={Duzenle} />
            <drawer.Screen name="Çıkış Yap" component={handleSignOut} />
        </drawer.Navigator>
        
  );
  

}