


import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,
  ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import axios  from "axios";

import Select_Day_Orders from './Tasks/Select_Day_Orders'
// import Screens from "./Tasks/Screens";
import NetInfo from "@react-native-community/netinfo";
import Insert_Order from './Tasks/Insert_Order'

 class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: true,
      tirmnate: true,
      show:false,
      phone:'',
      name:'',
      network_connection:false,
    }
  } 


  netInfoState() {
   
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.setState({network_connection: true});
        // this.getItem();
       
      } else {
        this.setState({network_connection: false});
      }
    });
  }

  Hide_Splash_Screen = () => {
    this.setState({
      isVisible: false
    });
  }


  componentDidMount() {
 
    var that = this;
    setTimeout(function () {
      that.Hide_Splash_Screen();
    }, 5000);
  
    this.netInfoState()
    // this.setItem()
  }




  render() {
    let Splash_Screen = (

      <View style={styles.SplashScreen_RootView}>
        <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />
        <View style={styles.SplashScreen_ChildView}>

          <Image source={require('./img/mahmoud.png')}
            style={{ width: '100%', height: '100%', resizeMode: 'contain' }} />
        </View>
      </View>)
    return (
      <>
     {
      this.state.network_connection ==false?
      <View style={{height:windowHeight,justifyContent:'center',alignItems:'center'}}>
        <Image  source={require('./img/wifi.png')}
          style={{width:80,height:80,resizeMode:'contain'}}
        />
      <Text style={{fontSize:20,textAlign:'center',fontWeight:'bold',color:'#000',marginTop:8}}>لا يتوفر اتصال بالانترنت</Text>
      </View>
      :
      this.props.navigation.navigate("Select_Day_Orders")
      // null
       
      }
      

      {
          (this.state.isVisible === true) ? Splash_Screen : null
      }


      </>   
    )
  }
}

export default createAppContainer(
  createStackNavigator(
  {
   App:App,
   Select_Day_Orders:Select_Day_Orders,
   Insert_Order:Insert_Order,
  },
  {
   headerMode: 'none'
 },
 {
   initialRouteName: 'App'
 }
  ))

  const styles = StyleSheet.create({
  
    view_img: {
      width: windowWidth,
      height: windowHeight * .36,
      backgroundColor: '#F3F3F3',
      justifyContent: "center",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
      marginTop:20,
      flexDirection:'row',
    },
  
    my_view:{
      flexDirection:'column',
      width:60,
      backgroundColor:'#fff',
      justifyContent:'center',
      alignItems:'center',
      marginLeft:10,
      height:60,
    },
    
      MainContainer:
      {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: (Platform.OS === 'ios') ? 20 : 0
      },
  
      SplashScreen_RootView:
      {
        justifyContent: 'center',
        flex: 1,
  
        position: 'absolute',
        width: '100%',
        height: '100%',
      },
  
      SplashScreen_ChildView:
      {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#D6D4D9', //#D6D4D9
        flex: 1,
      },
  
  })
