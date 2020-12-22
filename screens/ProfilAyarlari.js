import React,{ useState } from 'react';
import { Text, View, SafeAreaView, Image, ScrollView,LogBox,TouchableOpacity,StyleSheet} from "react-native";
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import Colors from '../utils/colors'
import IconButton from '../components/IconButton';
import Photo from '../components/Firebase/storagePhoto'
import Change from '../components/Firebase/changeEmailPassword'
import * as firebase from 'firebase';

export default function ProfilAyarlari({navigation}) {
  useStatusBar('light-content');
return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent/>
        <ScrollView showsVerticalScrollIndicator={false}>

          <View style={styles.titleBar,{justifyContent:"space-between"}}>
            <View style={styles.profileImage}>
              <Photo style={styles.profileImage}></Photo>
            </View>
            <Change/>                          
          </View>
        </ScrollView>
    </SafeAreaView>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleBar: {
    flexDirection: "column",
    //justifyContent: "space-between",
    height: 180,
    backgroundColor:Colors.inactiveButton
  },
  textview:{
    alignItems:"center",
    marginTop:"7%"
  },
  image: {
    flex: 1,
    width: null,
    alignSelf: "stretch",
    borderRadius:50,
    backgroundColor:"black"
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 100,
    overflow: "hidden",
    alignSelf:"center",
    alignItems:"center",
    flexDirection: "column",
    //justifyContent: "space-between",
    padding:20
  },  
});

LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'Possible Unhandled Promise',
  'Can\'t perform a React state update on an unmounted component.'
])