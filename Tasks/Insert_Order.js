


import React, { version } from "react";
import {
  Text, View, TouchableOpacity, Image, StyleSheet, StatusBar, TextInput, ScrollView, FlatList, Alert,Platform,ActivityIndicator,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome5';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import AsyncStorage from '@react-native-community/async-storage'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import axios from "axios";
import DateTimePicker from '@react-native-community/datetimepicker';
import { ModalDatePicker } from "react-native-material-date-picker";



export default class Booking_Screen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      chosenDate :'',
      tirmnate: true,
      loading: true,
       isPickerShow:false,
      //  date:new Date(),
      // // date:'',
       setDate:new Date().toString(),
       mode:'date',
      date:new Date().toString(),
       Data:[],
      show :false ,
      Drawer_Visible:false,
      item:'اختر',
      hour:0,
      error_hour:'',
      text:'',
      user_id:0,
      hour_end:0,
      item_end:'اختر',
      show_end:false,
      error_hour_end:'',
       Times:[
         {
           name:'صباحا',
         },
        
         {
          name:'مساءا',
         },
       ],
    
    }
  }

  

  getItems(mydate){
   
    let data_to_send={
      booking_date: mydate
    }
   
    axios.post("https://camp-coding.com/classic/Select_Booking_Times.php",data_to_send).then(res => {
     
      if (res.status == 200) {
       
        if(typeof(res.data) == typeof({})){
           this.setState({
             Data:res.data,
             loading: false,
           })
          //  alert(res.data)
        }else{
           this.setState({text:'لا يوجد حجز',loading:false})
        }
      
      } else {
        alert("Try again later")
      }
    })

  }



  componentDidMount(){
    let user_id =this.props.navigation.getParam("user_id")
    this.setState({user_id:user_id})
    this.getItems(this.state.date.slice(0,16))
   
  }


  register(){
    this.setState({error_hour:'',error_hour_end:''})
    if(this.state.hour ==0 || this.state.item =='اختر'){
       this.setState({error_hour:'برجاء اختيار ساعة الحجز والفترة الزمنية'})
    }
    if(this.state.hour_end ==0 || this.state.item_end =='اختر'){
      this.setState({error_hour_end:'برجاء اختيار ساعة الحجز والفترة الزمنية'})
   }
   else{
      this.props.navigation.navigate("Confirm_Booking",{
         user_id:1 , // change this value 
         item:this.state.item,
         hour:this.state.hour,
         hour_end:this.state.hour_end,
         item_end:this.state.item_end,
         date:this.state.date.slice(0,16),
       })
    }
    
  }






  render() {
    return (
      <>

        <StatusBar
          backgroundColor={"#fff"}
          barStyle="dark-content"
        />

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

      <Text style={{ fontSize: 25, fontWeight: 'bold',color:'#000' }}>الحجز</Text>
      <TouchableOpacity
              onPress={() => {
                this.props.navigation.goBack()
              }}
            >
              <Icon name="arrow-left" size={25} style={{ color: '#000', }} />
            </TouchableOpacity>
     
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
 
 <View style={[styles.header,{borderTopRightRadius:15,width:windowWidth*.77}]}>
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
                this.props.navigation.navigate("Select_Day_Orders")
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
               <Icon name="utensils" size={27} style={{marginLeft:16}}/>
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

 <View style={{width:windowWidth,height:windowHeight*.81}}>  
<ScrollView>

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
          this.getItems(date.toString().slice(0,16))
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

    
       <View style={[styles.view_date,{}]}>
        <TextInput 
        width={windowWidth*.27}
          fontSize={19}
          fontWeight='700'
          color="#000"
          placeholder="ساعة البداية"
          keyboardType="number-pad"
          onChangeText={(value)=>{

            this.setState({hour:value.trim()})
          }}
        />
          <View style={{width:2,height:35,backgroundColor:'#000'}}>
          </View>

          <TouchableOpacity
        onPress={()=>{
           this.state.show == true?
           this.setState({show :false})
           :
           this.setState({show :true})
         
        }}
     >
        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:windowWidth*.18}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>{this.state.item}</Text>
          <Icon name="caret-down" size={25} style={{ color: '#000' }} />
          </View>
          </TouchableOpacity>
        </View>
        

        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF5100', textAlign: 'center',marginTop:12 }}>{this.state.error_hour}</Text>




        <View style={[styles.view_secend_date,{}]}>
        <TextInput 
        width={windowWidth*.27}
          fontSize={19}
          fontWeight='700'
          color="#000"
          placeholder="ساعة النهاية"
          keyboardType="number-pad"
          onChangeText={(value)=>{

            this.setState({hour_end:value.trim()})
          }}
        />
          <View style={{width:2,height:35,backgroundColor:'#000'}}>
          </View>

          <TouchableOpacity
        onPress={()=>{
           this.state.show_end == true?
           this.setState({show_end :false})
           :
           this.setState({show_end :true})
         
        }}
     >
        <View style={{justifyContent:'space-between',alignItems:'center',flexDirection:'row',width:windowWidth*.18}}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#000', textAlign: 'center' }}>{this.state.item_end}</Text>
          <Icon name="caret-down" size={25} style={{ color: '#000' }} />
          </View>
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 16, fontWeight: '700', color: '#FF5100', textAlign: 'center',marginTop:12 }}>{this.state.error_hour_end}</Text>


         
         {
          
           this.state.show == true  ?
       
           <View style={[styles.view_date,{ backgroundColor: '#fff', shadowColor: "#000",
           marginTop:0,height:windowHeight*.15,width:windowWidth*.3,marginLeft:windowWidth*.32,}]}>
               <View style={{width:windowWidth*.24,height:windowHeight*.12,justifyContent:'space-between',}}>
                   
        <FlatList 
          data={this.state.Times} 
          renderItem={({item,index}) => 
            
          <View style={{
            width: windowWidth * .3,
             height:40,
            // backgroundColor:'#0ff',
            // borderRadius: 15,
            alignSelf: 'center', 
            alignItems: 'center',
            marginTop: 0,
            borderBottomColor:'#000',
            borderBottomWidth:.5,
          
          }} >
            <TouchableOpacity
               onPress={()=>{
               this.setState({item:item.name,show:false})
                 
               }}
            >
            <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
              <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000', }}>{item.name}</Text>
            </View>
            </TouchableOpacity>
            </View>
         }
         />
                   
                   
                   
                    {/* {
                      this.state.Times.map((item,index)=>
                       
                      )
                    } */}
               </View>
            </View>
             :
              null
              
         }
         
         
  {
  this.state.show_end == true?
  <View style={[styles.view_date,{ backgroundColor: '#fff', shadowColor: "#000",
  marginTop:5,height:windowHeight*.15,width:windowWidth*.3,marginLeft:windowWidth*.32,}]}>
      <View style={{width:windowWidth*.24,height:windowHeight*.1,justifyContent:'space-between',}}>
           {
             this.state.Times.map((item,index)=>
               <View style={{
                 width: windowWidth * .3,
                  height:40,
                 // backgroundColor:'#0ff',
                 // borderRadius: 15,
                 alignSelf: 'center', 
                 alignItems: 'center',
                 marginTop: 0,
                 borderBottomColor:'#000',
                 borderBottomWidth:.5,
               
               }} >
                 <TouchableOpacity
                    onPress={()=>{
                    this.setState({item_end:item.name,show_end:false})
                    
                    }}
                 >
                 <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
                   <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000', }}>{item.name}</Text>
                 </View>
                 </TouchableOpacity>
                 </View>
             )
           }
      </View>
   </View>
   :
   null
}
        
       
         
     
     
         

{
  this.state.text =='' ?(
    <>
{
          this.state.loading == true ?
          (
            <View style={{ justifyContent: 'center', alignItems: 'center',height:windowHeight*.5 }}>
              <ActivityIndicator size={60} color="#FF5D00" ></ActivityIndicator>
            </View>

            ) : (
        <>
        
               <View style={[styles.view_date, { width: windowWidth * .9, backgroundColor: '#fff', shadowColor: "#000",height:47 }]}>
          <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", color: '#000' }}>من</Text>
          </View>

          <View style={{
            width: windowWidth * .3,
            //  backgroundColor:'#0ff',
            alignItems: 'center',
            borderLeftColor: '#000',
            borderLeftWidth: 2,
            borderRightWidth: 2,
            height: 40,
            justifyContent: 'center',
          }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", color: '#000' }}>الى</Text>
          </View>
          <View style={{ width: windowWidth * .3, paddingLeft: 14 }}>
            <Text style={{ fontSize: 19, fontWeight: "bold", color: '#000' }}>الحالة</Text>
          </View>
        </View>

        {
          this.state.Data.map((item, index) =>
          

              <TouchableOpacity disabled={true}
                onPress={() => {
                  // this.props.navigation.navigate("")
                }}
              >
                <View style={[styles.view_date, {
                  width: windowWidth * .9, backgroundColor: '#fff',height:48,
                }]}>
                  <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000', }}>{item.start_booking}</Text>
                  </View>

                  <View style={{
                    width: windowWidth * .3,
                    //  backgroundColor:'#0ff',
                    alignItems: 'center',
                    borderLeftColor: '#000',
                    borderLeftWidth: 2,
                    borderRightWidth: 2,
                    height: 40,
                    justifyContent: 'center'
                  }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000' }}>{item.end_booking} </Text>
                  </View>

                  <View style={{ width: windowWidth * .3, paddingLeft: 12 }}>
                    {
                      item.status.trim() == 'حجز عادى' || item.status.trim()=='حجز عريس' ?
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: '#FF5100' }}>محجوز</Text>
                        :
                        <Text style={{ fontSize: 18, fontWeight: "bold", color: '#000' }}>{item.status} </Text>
                    }

                  </View>
                </View>

              </TouchableOpacity>
         
          )
        }

      <View  style={{width:50,height:50}}>

      </View>
             
       

      </>
            )
      }
 </>
  ):
  <View style={{height:windowHeight*.4,justifyContent:'center',alignItems:'center'}}>
    <Text style={{fontSize:22,textAlign:'center',fontWeight:'bold',color:'#FF5100'}}>{this.state.text}</Text>
  </View>
}



  </ScrollView>
  </View>  
  <TouchableOpacity
           onPress={()=>{
             this.register()

           }}
         >
            <View style={[styles.button,{}]}>
              <Text style={{ fontWeight: 'bold', fontSize: 22, color: '#000' }}>تسجيل الحجز</Text>
            </View>
          </TouchableOpacity>


      </>
    )
  }
}


const styles = StyleSheet.create({
  header: {
    width: windowWidth,
    height: windowHeight * .085,
    backgroundColor: '#fff',
      justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',

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
  view_secend_date :{
    width: windowWidth * .65,
    height: 55,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginTop: 15,
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
  button: {
    width: windowWidth * .65,
    height: windowHeight * .08,
    backgroundColor: '#FFDDDE',
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
   
    borderRadius: 15,

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
    
  }
})
