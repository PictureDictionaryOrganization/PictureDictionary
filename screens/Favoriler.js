import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';

export default function HomeScreen({navigation}) {
  useStatusBar('light-content');
  async function handleSignOut() {
    try {
      await logout();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <View style={styles.container}>
      <HeaderComponent navigation={navigation}/>  
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});