import React, { useState } from 'react'
import { View, StyleSheet, Button, SafeAreaView,TouchableOpacity,Text,Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from "../components/Header";
import useStatusBar from '../hooks/useStatusBar';
import {InputGroup,Input} from "native-base";
import * as firebase from 'firebase';
import axios from "axios";

export default function HomeScreen({navigation}) {
  useStatusBar('light-content');
  const [textState,setText] = useState("");
  const [titleState, setTitle] = useState("En-Tr");
  const [colorState, setColor] = useState("#b71c1c");
  const [answerState,setTranslate] = useState("");
  const [pictureState,setPicture] = useState("");
  const [favoriState,setFavori] = useState("ios-heart-empty");

  const changeTitle = () => {
    if(titleState=="En-Tr"){
      setTitle("Tr-En")
      setColor("blue")
    }
    else {
      setTitle("En-Tr")
      setColor("#b71c1c")
    }
  }

  const addFavori = () =>{
    if(favoriState=="ios-heart-empty"){
      setFavori("ios-heart")
      var User = firebase.auth().currentUser;
      firebase.database().ref('Users/'+ User.uid +('/Favoriler/')+answerState).set({
      arama:textState,
      cevap:answerState,
      image:pictureState
      }) 
    }
    else{
      setFavori("ios-heart-empty")
      var User = firebase.auth().currentUser;
      firebase.database().ref('Users/'+ User.uid +('/Favoriler/')+answerState).remove()
    }
  }

  const getPicture = (searchInput) => {
    const options = {
      method: 'GET',
      url: 'https://bing-image-search1.p.rapidapi.com/images/search',
      params: {q: searchInput, count: '1'},
      headers: {
        'x-rapidapi-key': 'a31269193fmsh7c064749afb3364p1068fbjsnf48c68320a1d',
        'x-rapidapi-host': 'bing-image-search1.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
        console.log(response.data.value[0].contentUrl);
        setPicture(response.data.value[0].contentUrl)
    }).catch(function (error) {
        console.error(error);
    });
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
          setTranslate(response.data.data.translation)
          getPicture(response.data.data.translation)
      }).catch(function (error) {
          console.error(error);
      });
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderComponent navigation={navigation}/>  
        <View style={styles.searchStyle}>
          <InputGroup style={{borderColor:"black", borderWidth:3}}>   
            <TouchableOpacity>
              <Ionicons
              name="ios-search"
              color="grey"
              size={30}
              onPress={translate}
              />
            </TouchableOpacity>  

            <Input style ={styles.inputSearch} 
            placeholder="Search" onChangeText={(value)=>setText(value)}
              />
            <Button 
              title = {titleState}
              onPress={changeTitle}
              color={colorState}
            />  
          </InputGroup>
        </View>
        {(answerState!="" && pictureState !="") &&
              <View style={styles.searchStyle}>
                  <View style={{flexDirection:"column",alignItems:"center"}}>

                    <Text style={styles.textStyle}>{answerState}</Text>
                    <TouchableOpacity>
                      <Ionicons
                      name={favoriState}
                      color="black"
                      size={30}
                      onPress={addFavori}
                      />
                    </TouchableOpacity>           

                  </View>
                  <Image source={{uri:pictureState}} style={styles.imageStyle}></Image> 
              </View>
        }

    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inputSearch:{
    fontSize:18,
    textTransform: "capitalize",
    flex:1,
  },
  searchStyle:{
    marginHorizontal:"2%",
    marginVertical:"2%",
    padding:"1%",
    justifyContent:"center",
    borderWidth:2,
    borderRadius:15,
    backgroundColor:"#E1E2E6"
  },
  imageStyle:{
    width:200,
    height:200,
    resizeMode:'contain',
    alignSelf:"center"
  },
  textStyle:{
    fontSize:20,
    color: "black",
    textTransform: "capitalize",
    fontWeight: "bold"
  },
});
