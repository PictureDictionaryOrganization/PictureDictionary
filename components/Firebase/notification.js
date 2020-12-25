import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as firebase from 'firebase';
import React, { useState, useEffect, useRef } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const [list,setList] = useState([]);
  const [state, setState] = useState({
    email: '',
    name: '',
});

  useEffect(() => {
    var user = firebase.auth().currentUser;
    const li = []; 
    firebase.database().ref('Users/'+ user.uid +'/Favoriler').on('value',function (data) {
          data.forEach((child)=>{               
              li.push({
                  arama:child.val().arama,
                  cevap:child.val().cevap,
                  image:child.val().image,
                  key: child.val().arama,
              });   
            });
            setList(li);            
      });
}, []);

  useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  async function send() {
    var index = Math.floor(Math.random() * list.length) ;
    var arama,cevap="";
    arama = list[index].arama
    cevap = list[index].cevap
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Dictionary",
      body: arama + " - " + cevap,
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}


  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        borderColor:'black',
        borderWidth:2,
        alignItems:"center",
        alignSelf:"center",
        borderRadius:50,
        marginTop:10,
        paddingHorizontal:10,
        backgroundColor:"#b71c1c"
      }}>
        <TouchableOpacity onPress={async () => {await send();}}>
          <Text style={{fontSize:20, color:"white"}}>Yolla</Text>
        </TouchableOpacity>
        
      
    </View>
  );
}
