import React, { useState, useEffect } from 'react'
import { Text, View, SafeAreaView, Image, ScrollView,LogBox,TouchableOpacity,StyleSheet,Switch} from "react-native";
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import { logout } from '../components/Firebase/firebase';
import * as firebase from 'firebase';
import Colors from '../utils/colors'

export default function HomeScreen({navigation}) {
  useStatusBar('light-content');
  const [userstate,setUser] = useState({});
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  useEffect(() => {
    var user ={email:'',name:'',surname:'',image:'',notifications:''};
    var User = firebase.auth().currentUser;
    firebase.database().ref('Users/'+User.uid+'/ProfileInformation').once('value', function (snapshot) {
      user.name = (snapshot.val() && snapshot.val().name) || 'Anonymous';
      user.surname = (snapshot.val() && snapshot.val().surname) || 'Anonymous';
      user.email = (snapshot.val() && snapshot.val().email) || 'Anonymous';
      user.image=(snapshot.val() && snapshot.val().profilePhoto);
      user.notifications=(snapshot.val() && snapshot.val().notifications);
      setUser(user);
  });
    firebase.database().ref('Users/'+ User.uid +('/ProfileInformation')).update({
    notifications:isEnabled,
    }) 
})
  return (
    <SafeAreaView style={styles.container}>
    <HeaderComponent navigation={navigation}/>  
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}></View>
        <View style={styles.profileImage}>
                <Image source={{uri:userstate.image}} style={styles.image} resizeMode="stretch"></Image> 
        </View>
        <View style={styles.textview}>
          <Text style={[{ color: "black", fontSize: 22  }]}> Ad: {userstate.name}</Text>
          <Text style={[{ color: "black", fontSize: 22  }]}> Soyad: {userstate.surname}</Text>
          <Text style={[{ color: "black", fontSize: 22  }]}> Mail: {userstate.email}</Text>
        </View>
        <View style={styles.switchStyle}>
            <Switch
            trackColor={{ false: "grey", true: "grey" }}
            thumbColor={isEnabled ? "#b71c1c" : "white"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            />
            <Text style={[{ color: "black", fontSize: 22  }]}> Günlük kelime bildirimi</Text>
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
  switchStyle: {
    flex:2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection:"row",
    marginTop:"7%",
  },
  textview:{
    alignItems:"center",
    marginTop:"7%",
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
    marginTop:-95
  },  
});

LogBox.ignoreLogs([
  'Setting a timer for a long period of time',
  'Can\'t perform a React state update on an unmounted component.'
])