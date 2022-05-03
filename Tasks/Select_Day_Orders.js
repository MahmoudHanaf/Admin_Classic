


import * as React from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList,Linking,
  ActivityIndicator,Alert,RefreshControl
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios  from "axios";
import { ModalDatePicker } from "react-native-material-date-picker";


import Insert_Order from '../Tasks/Insert_Order'
import Confirm_Booking from '../Tasks/Confirm_Booking'
import Rented from '../Tasks/Rented'
import Change_Work_Time from '../Tasks/Change_Work_Time'
import Select_Month_Orders from '../Tasks/Select_Month_Orders'
 class Select_Day_Orders extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Drawer_Visible:false,
      Orders:[],
      loading:true,
      loading_Items:true,
      isPickerShow:false,
      //  date:new Date(),
      // // date:'',
       setDate:new Date().toString(),
       mode:'date',
      date:new Date().toString(),
      chosenDate :'',
      tirmnate: true,
      text:'',
      photo_uri:'',
      photo_data:null,
      refresh :false,

    }
  } 


  Delete_Order(order_id){

    let data_to_send = {
        order_id: order_id,
    }// https://classicapp.000webhostapp.com
    axios.post("https://camp-coding.com/classic/Delete_Order.php", data_to_send).then(res => {
        if (res.status == 200) {
                  
        }
    })

}



createTwoButtonAlert = (order_id) =>
Alert.alert(
  "هل تريد حذف الحجز",
  "",

  [
    {
      text: "لا",
      onPress: () => console.log("Cancel Pressed"),
      style: 'cancel',
    },
    { text: "نعم", onPress: () => {
       
      // this.setState({text:''})  
      this.Delete_Order(order_id)  
      this.get_Orders(this.state.date.slice(0,16))
    }
   
 }
  ],
  { cancelable: false }
);


onRefresh (){
  var that =this;
  setTimeout(function () {
    that.setState({refresh:false,refreshNum:1});
    that.get_Orders(that.state.date.slice(0,16))
  }, 3000)

}


  componentDidMount(){
    this.get_Orders(this.state.date.slice(0,16))
  }

 get_Orders(order){
  let data_to_send={
    booking_date: order
  }

  axios.post("https://camp-coding.com/classic/Select_Day_Orders.php",data_to_send).then(res=>{
    if(res.status ==200){
        if(typeof(res.data) == typeof({})){
          this.setState({
            Orders :res.data,
            loading:false,
          })
         
        }else{
          this.setState({text:'لا يوجد حجز',loading:false})
        }
     
    }else{
      alert("Try agaib later")
    }
 })
 }


 



  render() {
    return (
      <>
        <StatusBar
          backgroundColor="#fff"  //#FF6C00
          barStyle="dark-content"
        />
 
 {
   this.state.loading ==true ? (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <ActivityIndicator size={55} color="#FF5D00">
        </ActivityIndicator>
        </View>
   ):(
     
    <>

    {
        this.state.Drawer_Visible !=true?
        <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          this.state.Drawer_Visible ==false ?(
            this.setState({Drawer_Visible:true})
          ):(
            this.setState({Drawer_Visible:false})
          )
        }}
      >
        <Icon name="align-justify" size={26} style={{color:'#000'}} />
      </TouchableOpacity>

      <Text style={{ fontSize: 23, fontWeight: 'bold',color:'#000' }}>طلبات اليوم</Text>
    
    <Image  source={require('../img/mm.png')}
         style={{width:50,height:50,resizeMode:'contain'}}
    /> 

    </View>
    :
    null
    }
    

     
    {
       this.state.Drawer_Visible ==true ?
       (
        <View style={{height:windowHeight,backgroundColor:'#fff'}}>
        <View style={{
            width:windowWidth*.77,
            height:windowHeight*.97,
            backgroundColor:'#fff',
            shadowColor: "#000",
            position:'relative',
            borderBottomEndRadius:15,
             borderTopRightRadius:15,
            marginTop:7,
           shadowOffset: {
             width: 0,
             height: 1,
           },
           shadowOpacity: 0.22,
           shadowRadius: 2.22,
           elevation: 3,
           alignItems:'center'
            }}>
 
 <View style={[styles.header,{borderTopRightRadius:15,}]}>
       <TouchableOpacity
         onPress={() => {
           this.state.Drawer_Visible ==false ?(
             this.setState({Drawer_Visible:true})
           ):(
             this.setState({Drawer_Visible:false})
           )
         
          
         }}
       >
         <Icon name="align-justify" size={26} style={{color:'#000'}} />
       </TouchableOpacity>      
     </View>
             <Image source={require('../img/mm1.jpg')}
                style={{width:120,height:120,borderRadius:60,resizeMode:'cover'}}
             />
            
            <TouchableOpacity
              onPress={()=>{
                this.setState({Drawer_Visible:false})
              }}
            >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>طلبات اليوم</Text>
 
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
               </View>
 
             </View>
             </TouchableOpacity>
 
 
              <TouchableOpacity
                 onPress={()=>{
                  this.props.navigation.navigate("Select_Month_Orders") 
                  this.setState({Drawer_Visible:false})
                 }}
              >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:23,fontWeight:'bold',color:'#000'}}>طلبات الشهر</Text>
 
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
 
               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
               </View>
             </View>
             </TouchableOpacity>
 
 
             <TouchableOpacity
                 onPress={()=>{
                   this.props.navigation.navigate("Insert_Order")
                   this.setState({Drawer_Visible:false})
                 }}
              >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:20,fontWeight:'bold',color:'#000'}}>حجز عريس{'\n'}او طوارىء</Text>
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
               <Icon name="edit" size={27} style={{marginLeft:16}}/>
               </View>
             </View>
             </TouchableOpacity>
 
 
 
               <TouchableOpacity
                 onPress={()=>{
                   this.props.navigation.navigate("Change_Work_Time")
                   this.setState({Drawer_Visible:false})
                 }}
               >
             <View style={styles.drwer_view}>
               <Text style={{fontSize:22,fontWeight:'bold',color:'#000'}}>مواعيد العمل</Text>
 
               <View style={{width:windowWidth*.29,justifyContent:'center',
               alignItems:'center'}}>
               <Icon name="clipboard-list" size={27} style={{marginLeft:16}}/>
               </View>
             </View>
             </TouchableOpacity>
          </View>
          </View>
       ) :
       null
       }
                
     
<View style={styles.container}>
      <ScrollView >

    <View style={{flex: 1, alignSelf: 'stretch'}}>
    <ModalDatePicker 
        button={ 
          <View style={styles.view_date}>
        <Icon name="calendar-minus" size={20} style={{ color: '#FF5100' }} />
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>اختر تاريخ الحجز</Text>
        </View>
        
      } 
        locale="tr" 
        onSelect={(date) => {
          this.setState({date:date.toString(),text:'',location:true})
          this.get_Orders(date.toString().slice(0,16))
          // this.getItems(this.state.date.slice(0,16))
        }
        }
        isHideOnSelect={true}
        initialDate={new Date()}
        language={require('../Tasks/en.json')}
         color={'#FF5100'}
         
     />             
  </View>

<Text style={{fontSize:18,fontWeight:'bold',color:'#000',textAlign:'center',marginTop:10}}>{this.state.date.slice(0,16)}</Text>


         {
           this.state.text ==''?
           <>

        <FlatList 
          data={this.state.Orders} 
          renderItem={({item,index}) =>
           
          <TouchableOpacity  activeOpacity={.91}
          onLongPress={()=>{
            this.createTwoButtonAlert(item.order_id)
          }}
        
        >  
        <View style={styles.style_map} > 
        <View style={{
          height:70,
          width:'92%',
          // backgroundColor:'#ddd',
          justifyContent:'space-between',
          alignItems:'center',
          flexDirection:'row',
        }}>
         

         <View style={{flexDirection:'column'}}>
        <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}>{item.user_name}</Text>
        <Text style={{fontSize:17,fontWeight:'700',marginTop:10,color:'#000'}}>السن :  {item.user_age}</Text>
        </View>
     
        <Icon name ='user-circle' size={50} style={{}}/>
        </View>



        <View style={[styles.style_view,{alignSelf:'center',}]}>
            <View style={[styles.style_view,{alignSelf:'center',width:windowWidth*.27,}]}>
            <TouchableOpacity
             onPress={()=>{
              Linking.openURL("tel:"+ item.user_phone)
             }}
            >
            <Icon name="phone" size={24} style={{color:'#00f'}}/>
            </TouchableOpacity>

            <TouchableOpacity
             onPress={()=>{
              Linking.openURL("https://api.whatsapp.com/send?phone=+2"+item.user_phone)
             }}
            >
            <Icon name="whatsapp-square" size={30} style={{color:'#0f0'}}/>
            </TouchableOpacity>
            </View>
           
            <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}>{item.user_phone}</Text>
            </View>
     
            <Text style={{fontSize:18,fontWeight:'bold',color:'#000'}}>الحجز من الساعة {item.start_booking}  الى  {item.end_booking}</Text>

            <Text style={{fontSize:23,fontWeight:'bold',color:'#000',marginTop:5}}> الخدمات</Text>
        
            <View style={[styles.style_view,{flexWrap:'wrap',marginBottom:10}]}>
                  {
                    item.services.split("//").map((service,index)=>
                    <>
                    <Icon name="square-full" size={17} style={{color:'#FF5100'}}/>
                    <Text  numberOfLines={2}
                    style={{fontSize:17,fontWeight:'bold',color:'#000',}}>{service}</Text>
                    </>
                    )
                  }
            </View>
            <Text style={{fontSize:15,fontWeight:'500',color:'#000',textAlign:'center'}}>{item.booking_time}</Text>


    </View>
    
    </TouchableOpacity>  

        }
        
        />


           </>
           :
           <View style={{height:windowHeight*.65,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:22,textAlign:'center',fontWeight:'bold',color:'#FF5100'}}>{this.state.text} </Text>
  </View>
         }

     
          
         <View style={{width:50,height:windowHeight*.1,}}></View>

      </ScrollView>
    </View>

    <View style={{height:windowHeight*.23,paddingLeft:18,paddingBottom:10,}}>
      <TouchableOpacity
         onPress={()=>{
           this.setState({loading:true})
          this.get_Orders(this.state.date.slice(0,16))
         }}
      >
      <View style={{height:60,width:60,backgroundColor:'#FF5100',borderRadius:30,justifyContent:'center',alignItems:'center'}}>
          <Icon  name="redo" size={22} style={{color:'#fff'}}/>
      </View>
      </TouchableOpacity>
    </View>
</>



   )
 }


            


        

      </>
    )
  }
}

 export default createAppContainer(
   createStackNavigator(
   {
    Select_Day_Orders:Select_Day_Orders,
    Insert_Order:Insert_Order,
    Confirm_Booking:Confirm_Booking,
    Rented:Rented,
    Change_Work_Time:Change_Work_Time,
    Select_Month_Orders:Select_Month_Orders,
   },
   {
    headerMode: 'none'
  },
  {
    initialRouteName: 'Select_Day_Orders'
  }
   ))

   


//  )



const styles = StyleSheet.create({
  header: {
    width: '100%',
    height: '8%',   //windowHeight * .08
    backgroundColor: '#fff',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 14,
    paddingRight: 2,
    flexDirection: 'row',
  },
  container: {
    width: '100%',
    height: windowHeight*.82,
    // backgroundColor: '#f0f',
    justifyContent: 'space-between',
    alignItems: 'center',

  },
  style_map:{
    width: windowWidth * .94,
    // height: windowHeight * .38, //
    backgroundColor: '#fff',     //#F3F0F7
    marginTop:15,
    justifyContent: 'space-around',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 20,
    alignSelf: 'center',
    paddingTop:10,
    paddingBottom:10,
  },
  sub_view:{
    width:'95%',
    // height:windowHeight*.2,
    // backgroundColor:'#0ff',
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  drwer_view:{
    width:windowWidth*.77,
    height:windowHeight*.1,
    alignItems:'center',
    backgroundColor:'#fff',
    justifyContent:'flex-end',
    flexDirection:'row',
    marginTop:23,
    shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 1,
  },
  shadowOpacity: 0.22,
  shadowRadius: 2.22,

  elevation: 3,
    
  },
  style_view:{
    width:windowWidth*.88,
    height:50,
  // backgroundColor:'#ddd',
    justifyContent:'space-between',
    alignItems:'center',
    flexDirection:'row',
    paddingRight:10,
   },
   view_date: {
    width: windowWidth * .65,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 15,
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: 15,
    shadowColor: "#C8C7CA",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flexDirection: 'row'

  },
  datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
})