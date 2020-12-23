import React, { useState } from 'react'
import { View, StyleSheet, Button, SafeAreaView } from 'react-native';
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import {InputGroup,Input} from "native-base";
import { logout } from '../components/Firebase/firebase';
import axios from "axios";

export default function HomeScreen({navigation}) {
  useStatusBar('light-content');
  const [textState,setText] = useState("");
  const [titleState, setTitle] = useState("En-Tr");
  //const [answer,setTranslate] = useState(""); fotoğraf

  const changeTitle = () => {
    if(titleState=="En-Tr"){
      setTitle("Tr-En")
    }
    else setTitle("En-Tr")
  }

  const translate = () => {
    var first,second=""
    if(textState!=""){
      if(titleState=="En-Tr"){
        first="tr",
        second="en"
      }
      else{
        first="en"
        second="tr"
      }
      const options = {
        method: 'GET',
        url: 'https://google-translate20.p.rapidapi.com/translate',
        params: {text: textState, tl: first, sl: second},
        headers: {
          'x-rapidapi-key': 'a31269193fmsh7c064749afb3364p1068fbjsnf48c68320a1d',
          'x-rapidapi-host': 'google-translate20.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
          console.log(response.data.data.translation);
          //setTranslate(response.data.data.translation) fotoğraf
      }).catch(function (error) {
          console.error(error);
      });
    }
}
return (

    <View style={styles.container}>
    <HeaderComponent navigation={navigation}/>  
      <View>
      <InputGroup>
            <Button title = "çevir"
            onPress={translate}/>

            <Input style ={styles.inputSearch} 
            placeholder="Choose pick up location" onChangeText={(value)=>setText(value)}
            />
            
            <Button title = {titleState}
            onPress={changeTitle}/>
        </InputGroup>
      </View>
  </View>

);

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputSearch:{
    fontSize:14,flex:1,
},
});
