import React from "react";
import {Text,StyleSheet,Image,View} from "react-native";
import {Header,Body} from "native-base";
import useStatusBar from '../hooks/useStatusBar';

export const HeaderComponent = () => {
	useStatusBar('light-content');
    return(
        <Header style={{backgroundColor:"#b71c1c"}} >   
        <Body style ={{alignItems:"center"}}>
        <View style={{flexDirection:"row"}}>
			<Image source={require('../assets/flame.png')} style={styles.logo} />        
            <Text style ={styles.headerText}>Dictionary</Text>
        </View>           
        </Body>
        </Header>
    );
}

const styles = StyleSheet.create({
	headerText:{
		color:"#fff",
        fontSize:25,
        alignItems:"center",
		fontWeight:"bold",
		marginTop:10,
		marginRight:50
	},
	logo:{
		width:40,
		height:40,
		marginTop:7,
		marginRight:10
		
	}

});
export default HeaderComponent;