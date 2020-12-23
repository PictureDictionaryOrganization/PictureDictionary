
import { View, StyleSheet, Button } from 'react-native';
import HeaderComponent from "../components/Header";
import React, { useState, useEffect } from 'react';
import * as firebase from 'firebase';
import {useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export default function App() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      // Assume a message-notification contains a "type" property in the data payload of the screen to open

      firebase.messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
          'Notification caused app to open from background state:',
          remoteMessage.notification,
        );
        navigation.navigate(remoteMessage.data.type);
      });

      // Check whether an initial notification is available
      firebase.messaging()
        .getInitialNotification()
        .then(remoteMessage => {
          if (remoteMessage) {
            console.log(
              'Notification caused app to open from quit state:',
              remoteMessage.notification,
            );
            setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
          }
          setLoading(false);
        });
    }, []);

  if (loading) {
    return null;
  }

  return (
    <View style={styles.container}>
      <HeaderComponent navigation={navigation}/>  
    </View>
  );
}
