

import React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Alert,ActivityIndicator
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage' 
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";


// import {NavigationContainer, StackActions} from '@react-navigation/native'
//  import {createDrawerNavigator} from '@react-navigation/drawer'

//  import { createStackNavigator } from '@react-navigation/stack';




export default class Confirm_Booking extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Booking_Data :{},
      date:'',
      item:'',
      hour:0,
      loading: false,
      name:'',
      phone:'',
      user_id:0,
      text:'',
      hour_end:'',
      item_end:'',
}
  }

  componentDidMount(){
      let user_id =this.props.navigation.getParam("user_id")
      let item=this.props.navigation.getParam("item")
      let item_end=this.props.navigation.getParam("item_end")
      let hour=this.props.navigation.getParam("hour")
      let hour_end=this.props.navigation.getParam("hour_end")
      let date=this.props.navigation.getParam("date")
      this.setState({
        item:item,
        hour:hour,
        date:date,
        user_id:user_id,
        hour_end:hour_end,
        item_end:item_end,
      })
      
  
  }



  getItems(){
    this.setState({loading:true})
    let data_to_send={
      user_id: 1, // this value will change
      booking_date:this.state.date,
      status:'حجز عريس',
      start_booking: this.state.hour +' '+ this.state.item,
      end_booking:this.state.hour_end +' '+ this.state.item_end,
      services: [].join("//"),
    }
   
    axios.post("https://camp-coding.com/classic/Insert_Order.php",data_to_send).then(res => {
     
      if (res.status == 200) {
        //  alert(res.data)
        if((res.data)*0 == 0){
          this.setState({loading:false})
          this.props.navigation.navigate("Rented",{
            booking_date:this.state.date,
          })
        }else{
          this.setState({text:'لقد تم الحجز مسبقا فى هذا اليوم',loading:false})
        }

      } else {
        alert("Try again later")
      }
    })

  }


  

  render(){
      return(
          <>
     <StatusBar
          backgroundColor={"#fff"}
          barStyle="dark-content"
        />


       <View style={styles.header}>
          <View style={{width:windowWidth*.58,alignItems:'flex-end'}}>
          <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#000',marginLeft:10,textAlign:'center' }}>تاكيد الحجز</Text>
           </View>


          <View style={{width:windowWidth*.35}}>
          <TouchableOpacity
            onPress={()=>{
                this.props.navigation.goBack()
            }}
          >
           <Icon name ="arrow-left" size ={25} style={{color:'#000'}}/>
           </TouchableOpacity>
           </View>
        </View>
         
         <View style={styles.view_date}>
         <Text style={{fontSize:24,fontWeight:'bold',color:'#000'}}>حجزك</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15,}}> من الساعة  : {this.state.hour} {this.state.item}</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15}}> الى الساعة  : {this.state.hour_end +' '+ this.state.item_end}</Text>
         
         <Text style={{fontSize:23,fontWeight:'bold',color:'#000',marginTop:15,textAlign:'center'}}>اليوم :</Text>
         <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15}}>{this.state.date}</Text>

         </View>
          
        

         <TouchableOpacity  disabled={this.state.loading}
           onPress={()=>{ 
            this.getItems()
            
           }}
         >
            <View style={[styles.button,{marginTop:windowHeight*.1}]}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#000' }}>تاكيد الحجز</Text>
            </View>
          </TouchableOpacity>

          <Text style={{fontSize:20,fontWeight:'bold',color:'#000',marginTop:15,textAlign:'center'}}>{this.state.text}</Text>

          {
           this.state.loading ==true ?
           <View style={{ justifyContent: 'center', alignItems: 'center',height:50 }}>
           <ActivityIndicator size={50} color="#FF5D00" ></ActivityIndicator>
         </View>
         :
         null
         }

          </>
      )
  }
}

const styles = StyleSheet.create({
    header: {
      width: windowWidth,
      height: windowHeight * .085,
      backgroundColor: '#fff',
    //   justifyContent: "center",
      alignItems: "center",
      paddingLeft: 10,
      paddingRight: 10,
      flexDirection: 'row',
  
    },
    view_date: {
        width: windowWidth * .88,
        height: windowHeight*.38,
        backgroundColor: '#fff',
        borderRadius: 15,
        alignSelf: 'center',
        // justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 40,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 3,
        paddingTop:20,
    
      },
      button: {
        width: windowWidth * .65,
        height: windowHeight * .08,
        backgroundColor: '#FFDDDE',
        justifyContent: "center",
        alignItems: "center",
        alignSelf: 'center',
        marginTop: 20,
        borderRadius: 15,
    
      },

   })